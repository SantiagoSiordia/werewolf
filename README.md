# WEREWOLF

App to help werewolf board game's moderator moderate the game

## Useful links

- [Figma Design](https://www.figma.com/file/flP4b1MzO7YtIS3HFacSBO/Werewolf?node-id=0%3A1).
- [Some cards found on Pinterest](https://id.pinterest.com/clairinegisella/kartu-ww/)

## Adding new .env variables

To add new variables to the environment, you have to add them in the `.env` file. Say we want to add `TEST_VAR`:

In `.env`:

```diff
...
+TEST_VAR="Test variable"
```

And you also have to add the type of that variable manually in `src/types/env.d.ts`:

```diff
declare module '@env' {
    // ...
+   export const TEST_VAR: string;
}
```