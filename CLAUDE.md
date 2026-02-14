# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UHN (Unified Home Network) blueprint example project. Blueprints are TypeScript-authored declarative descriptions of **resources** (lights, sockets, sensors, buttons) and **rules** (automation logic reacting to resource events). They are validated at build time and executed by the UHN runtime in a sandboxed environment.

The `@uhn/blueprint` dependency is linked locally (`link:../uxp/packages/uhn-blueprint/`) and requires the UXP monorepo to be checked out alongside this project.

## Commands

```bash
pnpm build          # Build blueprint (creates dist/blueprint-tmp/ and dist/blueprint.zip)
pnpm typecheck      # Type-check without emitting (tsc --noEmit)
pnpm sourcemaps     # Generate source maps from transformed sources (for debugging)
```

## Architecture

Three-layer structure under `src/`:

- **`factory/`** - Type-safe factory functions wrapping `@uhn/blueprint`'s `digitalInput()` and `digitalOutput()` with project-specific type unions (`Edge`, `InputDevice`, `OutputDevice`, `Pin`). Factories like `inputPir()`, `inputButtonPush()`, `outputLight()`, `outputSocket()` pre-fill `inputKind`/`outputKind` so resource definitions stay concise.

- **`resources/`** - Exported resource instances created via factory functions. Each file represents a room/area (e.g., `kitchen.ts`, `toilet.ts`). Resources map to physical devices by `edge`, `device`, and `pin`. Timers are created with `timer()` from `@uhn/blueprint`. Only resource exports should come from this folder.

- **`rules/`** - Automation rules created with `rule()` from `@uhn/blueprint`. Rules use a fluent API chaining triggers (`.onTap()`, `.onLongPress()`, `.onActivated()`, `.onTimerActivated()`, `.onTimerDeactivated()`, `.suppress()`) followed by `.run(ctx => ...)`. The run callback receives a context with `ctx.runtime.getState()`, `ctx.timers`, `ctx.mute`, `ctx.logger`, and `ctx.cause`. Actions are returned via `ruleActions([...])` with action objects like `{ type: "setOutput", resource, value }`.

## Debugging Workflow

Blueprints run in a sandbox, not from `src/` directly. Debug workflow:

1. `pnpm build` - creates transformed sources in `dist/blueprint-tmp/src`
2. Upload `dist/blueprint.zip` to UHN and enable debugging
3. `pnpm sourcemaps` - generates source maps from the **transformed** sources
4. Attach VS Code debugger (port 9250, see `.vscode/launch.json` configs)
5. Set breakpoints in `dist/blueprint-tmp/src/`, **not** in `src/`

## Conventions

- Resources are named with room prefix (e.g., `kitchenLightCeiling`, `toiletPirSensor`)
- Each resource has a descriptive `description` string
- Rules import resources directly from `../resources/` files
- Device/pin types are narrowly constrained via unions in `factory.ts`
- Commit messages use conventional commits (`feat:`, `fix:`, etc.)
