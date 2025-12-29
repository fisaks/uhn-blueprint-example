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

