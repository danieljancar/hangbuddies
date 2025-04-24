# SCSS Class Naming & Structure Guide

This doc helps us keep things clean and consistent when writing styles across apps.

## Goals

- Stay consistent across components
- Avoid style conflicts
- Make it easy to find and reuse things
- Keep styles readable and manageable

## Class Naming Basics

We use a mix of utility classes and component-scoped naming.

### Utility Classes

Reusable stuff like visibility, text alignment, spacing. These go in global files like `utils.scss`.

```
.util-hide-mobile
.util-text-center
.util-mb-sm
```

### Component Classes

Use a unique base class name for each component (usually matches the component name), with nested parts and modifiers.

```
.navbar            // the component root
.navbar__logo      // element inside it
.navbar__button--active // modified state
```

## Nesting Rules (SCSS)

Keep it max 2 levels deep, no crazy nesting.

```scss
.navbar {
    display: flex;

    &__logo {
        height: 40px;
    }

    &__button {
        font-weight: bold;

        &--active {
            color: $accent;
        }
    }
}
```

## Angular Material Tips

When you need to tweak Material styles:

- Use `::ng-deep` **only inside component styles**, not globally.
- Or use custom classes on your Material buttons, icons, etc.
- Avoid fighting Material’s styles directly — layer over them or use their CDK.

## Summary Table

| Type      | Prefix         | Use Case           |
| --------- | -------------- | ------------------ |
| Utility   | `.util-*`      | Shared helpers     |
| Component | `.your-name-*` | Per component base |
| Elements  | `__element`    | Inside components  |
| Modifiers | `--modifier`   | State styling      |
