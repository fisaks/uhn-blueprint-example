# UHN Example Blueprint

> 🚧 **WORK IN PROGRESS** 🚧

This repository contains an **example UHN blueprint project**.  
It demonstrates how to define **resources** and **rules** using the `@uhn/blueprint` API.

The blueprint is intentionally **small, concrete, and realistic**, loosely inspired by a typical home automation setup
(lights, sockets, rooms, etc.), but it is **not tied to any real system** and does not contain sensitive data.

---

## What is a UHN Blueprint?

A UHN blueprint is a declarative description of:

- **Resources**  
  Things that exist in the system (e.g. lights, sockets, inputs, outputs).

- **Rules**  
  Logic that reacts to changes in resources and produces actions.

Blueprints are **authored in TypeScript**, validated and normalized at build time, and then executed by the UHN runtime.

This repository serves as:
- a test bed during UHN development
- an example for blueprints
- a reference for folder structure

---

## Repository Structure

```text
src/
├── factory/        # Resource factory functions
├── resources/      # Resource definitions
└── rules/          # Rule definitions
```

### `src/factory`
Contains factory functions used to define resources.  
This folder acts as the **single source of truth** for what counts as a resource factory.

### `src/resources`
Contains exported resource definitions.  
Only resources should be exported from this folder.

### `src/rules`
Contains rule definitions created using the `rule()` factory.

---

## Dependency Note (Important)

This project currently depends on `@uhn/blueprint` via a **local workspace link**:

```json
"@uhn/blueprint": "link:../uxp/packages/uhn-blueprint/"
```

This means:

- The project is **not installable on its own**
- It is expected to live **next to the UXP repository** locally
- You must adjust this path to match where your local UXP repo is located

For example, if your directory structure looks like this:

```text
projects/
├── uxp/
└── uhn-example-blueprint/
```

then the link should be updated accordingly.

---

## Debugging Blueprints in the UHN Sandbox

Blueprints are executed **inside the UHN sandbox**, not directly from the original `src/` directory.

During the build process, the blueprint sources are copied into a temporary build directory, transformed, and then uploaded to UHN.  
For debugging to work correctly, **source maps must be generated from the transformed sources**, not from the original files.

This section documents the **intended debugging workflow** at a high level.  
Exact paths, ports, and runtime details may differ depending on the local UHN setup.

---

### Important Concept: Source of Truth

When debugging a blueprint:

- The files that are **executed by the runtime** are the source of truth
- Breakpoints must align with those files
- Source maps must be generated *after* the blueprint build step

If breakpoints jump, do not hit, or snap to the end of blocks, it usually means the debugger is mapping against the wrong source files.

---

### Build Order for Debugging

When debugging, always run the steps in this order:

1. Build the blueprint  
   This creates and transforms the temporary sources in  
   `./dist/blueprint-tmp/src`  

   ```bash
   pnpm build
   ```

2. Upload the generated blueprint archive to UHN, activate it, and enable debugging for the runtime

3. Generate source maps from the transformed sources  

   ```bash
   pnpm sourcemaps
   ```

4. Attach the debugger

5. Set breakpoints in the TypeScript files under  
   `./dist/blueprint-tmp/src`  
   **not** in the original `./src` directory

---

### Attaching a Debugger (VS Code)

Debugging is done using a **Node.js attach configuration**.

A typical setup uses:

- an *attach* request
- source maps enabled
- explicit local/remote path mapping

The exact configuration depends on how the UHN runtime is started and where the generated files are located.

An example vscode launch configuration:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Attach to UHN rule runtime (sandbox)",
            "type": "node",
            "request": "attach",
            "port": 9250,
            "address": "localhost",
            "restart": true,
            "skipFiles": [
                "<node_internals>/**"
            ],
            "sourceMaps": true,
            "outFiles": [],
            "localRoot": "/",
            "remoteRoot": "/",
            "sourceMapPathOverrides": {
                "file:///uhn-workspace/blueprint/active/dist/*": "${workspaceFolder}/dist/blueprint-tmp/out/*",
                "file:///uhn-runtime/node_modules/*": "/home/user/Codes/uxp/node_modules/*",
                "/uhn-runtime/*": "/home/user/Codes/uxp/*"
            }
        }     
    ]
}
```

> ℹ️ The debug port and remote paths depend on your UHN configuration.

---

### Common Debugging Issues

- **Breakpoints are not hit**  
  → Source maps do not match the executed files

- **Breakpoints jump to `}`**  
  → Source maps were generated from the wrong sources

- **Stepping behaves unpredictably**  
  → Debugger paths do not match runtime paths

These are expected symptoms when source maps are out of sync with the executed code.

---

### Summary

- Blueprints are debugged from **generated sources**, not the original `src`
- Source maps must be generated **after** the build step
- The debugger attaches to the running sandboxed runtime
- Correct path mapping is essential for reliable breakpoints