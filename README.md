# tasker-client
Client repo for Tasker

## Convention 🚧
1. Component name must be `Capitalize`
2. Prevent export component as `default`
3. Props drill maximum 3 levels
4. Use `semantic tag` as much as posible
5. Avoid using `any` type as much as posible

## Create a new component ⚙️

To create new component, follow these several steps:

1. Create new component folder
2. Create `index.ts` file (this file will export all of the additional components that use to build our component)
3. Create `<component_name>.tsx` file (this file will contain our component code)

_Example:_

```
// Folder structure
├── src
│   ├── components
│   │   ├──  ColorPicker
│   │   │   ├──  index.ts
│   │   │   ├──  ColorPicker.tsx
│   │   │   └──  ColorItem.tsx
```

```typescript
// ColorItem.tsx
type ColorItemProps = {
  colorName: 'red' | 'green'
  onColorChange: () => void
}

export const ColorItem: React.FC<ColorItemProps> = ({ colorName, onColorChange }) => {
  return <div color={colorName} onClick={onColorChange} />
}
```

```typescript
// ColorPicker.tsx
import { ColorItem } from './ColorItem'

export const ColorPicker = () => {
  return (
    <div>
      <ColorItem colorName="red" onColorChange={() => {}} />
    </div>
  )
}
```

```typescript
// index.ts
export * from './ColorItem'
export * from './ColorPicker'
```

## Commit Prefix (MUST HAVE)

1. `init`: Project initiation and configs
2. `feat`: A new feature
3. `fix`: A bug fix
4. `refactor`: A code change that neither fixes a bug nor adds a feature
5. `perf`: A code change that improves performance
6. `chore`: Very tiny fix, ex: typo, color

_Example:_

```bash
git commit -m "fix: add pivotal emojis to readme 🌈"
```
