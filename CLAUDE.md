# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UHN (Unified Home Network) blueprint example project. Blueprints are TypeScript-authored declarative descriptions of **resources** (lights, sockets, sensors, timers, virtual inputs), **views** (interactive UI tiles), **scenes** (preset command groups), **locations** (room/area UI groupings), and **rules** (automation logic). They are validated at build time and executed by the UHN runtime in a sandboxed environment.

The `@uhn/blueprint` dependency is linked locally (`link:../uxp/packages/uhn-blueprint/`) and requires the UXP monorepo to be checked out alongside this project.

For the full API reference, see the [Blueprint Authoring Guide](https://github.com/fisaks/uxp/blob/main/docs/uhn/blueprint-authoring-guide.md).

## Commands

```bash
pnpm build          # Build blueprint (creates dist/blueprint-tmp/ and dist/blueprint.zip)
pnpm typecheck      # Type-check without emitting (tsc --noEmit)
pnpm sourcemaps     # Generate source maps from transformed sources (for debugging)
pnpm z2m-import     # Import Zigbee2MQTT devices as resources/views
```

## Architecture

Six-layer structure under `src/`:

- **`factory/`** - Type-safe factory functions wrapping `@uhn/blueprint`'s base factories with project-specific type unions (`Edge`, `InputDevice`, `OutputDevice`, `Pin`). Factories like `inputPir()`, `outputLight()`, `virtualButton()`, `analogDimmer()` pre-fill kind/type so resource definitions stay concise.

- **`resources/`** - Exported resource instances created via factory functions. Files can be organized however you like (e.g., by room, by device type). Physical resources map to hardware via `edge`, `device`, `pin`. Logical resources (timers, virtual inputs, complex) use `host`. Only resource exports should come from this folder.

- **`views/`** - InteractionView definitions created with `view()` from `@uhn/blueprint`. Views define UI tiles that read state from resources via `stateFrom[]` and send commands on interaction. Supports tap, toggle, longPress, setAnalog (slider), and clearTimer commands. Secondary state display via `stateDisplay` items (value, indicator, flash styles).

- **`scenes/`** - Scene definitions created with `scene()` from `@uhn/blueprint`. Scenes group multiple resource commands (`setDigitalOutput`, `setAnalogOutput`, `emitSignal`) into reusable presets activated by rules or the UI.

- **`locations/`** - Location definitions created with `location()` from `@uhn/blueprint`. Locations group resources, views, and scenes into room/area containers for the UI. Items are auto-detected by shape (view has `stateFrom`, scene has `commands`, else resource).

- **`rules/`** - Automation rules created with `rule()` from `@uhn/blueprint`. Rules use a fluent API chaining triggers followed by `.run(ctx => ...)`. The run callback receives a context with `ctx.runtime.getState()`, `ctx.timers`, `ctx.mute`, `ctx.logger`, and `ctx.cause`. Actions are constructed via the `ruleAction()` factory.

### Trigger types
- State: `.onActivated()`, `.onDeactivated()`, `.onChanged()` (with optional `{ hysteresis }`)
- Threshold: `.onAbove(resource, threshold, opts)`, `.onBelow(resource, threshold, opts)`
- Gesture: `.onTap()`, `.onLongPress(resource, durationMs)`
- Action: `.onAction(resource, action)` - actionInput events (Zigbee buttons)
- Timer: `.onTimerActivated()`, `.onTimerDeactivated()`

### Action types (via `ruleAction()` factory)
- `ruleAction({ type: "setDigitalOutput", resource, value })` - control digital output
- `ruleAction({ type: "setAnalogOutput", resource, value })` - set analog value
- `ruleAction({ type: "emitSignal", resource, value })` - emit signal on input
- `ruleAction({ type: "emitAction", resource, action })` - emit action event for rule chaining (depth-limited)
- `ruleAction({ type: "activateScene", scene })` - activate a scene (expanded to individual commands at runtime)

### Scheduling
- `.suppress(ms)` - ignore triggers for duration after trigger event
- `.cooldown(ms)` - block re-execution for duration after rule runs

## Debugging Workflow

Blueprints run in a sandbox, not from `src/` directly. Debug workflow:

1. `pnpm build` - creates transformed sources in `dist/blueprint-tmp/src`
2. Upload `dist/blueprint.zip` to UHN and enable debugging
3. `pnpm sourcemaps` - generates source maps from the **transformed** sources
4. Attach VS Code debugger (port 9250, see `.vscode/launch.json` configs)
5. Set breakpoints in `dist/blueprint-tmp/src/`, **not** in `src/`

## Conventions

- Resources are named with room prefix (e.g., `kitchenLightCeiling`, `toiletPirSensor`)
- Views use prefix: `viewKitchenCeilingLight`
- Scenes use prefix: `sceneKitchenEvening`
- Locations use prefix: `locationKitchen`
- Each entity has a descriptive `description` string
- Entities can have optional `keywords` for command palette / voice search (synonyms and informal names not already in name/description/ID)
- Rules import resources directly from `../resources/` files
- Device/pin types are narrowly constrained via unions in `factory.ts`
- Commit messages use conventional commits (`feat:`, `fix:`, etc.)

## File Organization

Files within entity directories can be organized however you like (by room, by device type, etc.). Helper and utility files can live anywhere in `src/` outside the entity directories (e.g., `src/helpers/`, `src/utils/`).

## Static Analysis Constraints

The build uses ts-morph for AST analysis. `edge`/`host` must **resolve to a string literal** — the build resolves one level of indirection (const references, including cross-file imports, and spreads from const objects) but cannot evaluate function calls, ternaries, or chained const references. `id` must be a direct string literal or omitted for auto-injection from the export name. Subdirectories within entity directories are supported.

Rules must use the builder pattern (chained calls). Views, scenes, locations must be single factory calls. IDs must be valid TypeScript identifiers (no hyphens). Helper files that import resources will cause rules that import them to be promoted to master execution target.

## Build Pipeline

The build (`uhn-blueprint build`) performs: type-check, validate placement, copy to temp, normalize (auto-export + ID injection), resolve execution targets (static analysis of import chains to determine edge vs master), resolve emitsTap, and package to zip. Execution targets for rules are auto-determined from resource `edge`/`host` properties — rules importing scenes that touch multiple edges are promoted to master.
