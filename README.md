# SiiParser

App for parsing .sii files' data to json format.

## Arguments

- ```-r (--root-dir)``` - Game files root directory,
  see: https://modding.scssoft.com/wiki/Documentation/Engine/Game_data section "Root Game Folder"
- ```-f (--file-path)``` - Path to file that needs to be parsed
- ```-d (--dir-path)``` - Path to directory that has .sii files that need to be parsed
- ```-g``` - Skip classes that are unknown type (You will probably have to specify it every time if you're not
  debugging)
- ```-p``` - Skip class properties that are not defined in source files' class file (You will probably have to specify
  it every time if you're not debugging)

## Warning

This app is missing lots of classes that exist in game files. I only added those that I needed. You probably will have to add
some yourself and recompile it.

Same thing may be needed for value types (string, int, token, etc.), there are only few defined.

## Examples of usage (most common)

```$
npm start -- -r <root_dir> -f <file_path>.sii -o <output_file_path>.json -g -p
```

```$
npm start -- -r <root_dir> -d <directory_path> -o <output_file_path>.json -g -p
```

If you use compiled version, replace "npm start --" for "SiiParser" (linux executable filename).

## Adding your own Game Classes

1. Create file with .ts extension in /src/game-classes
2. Create class in it that extends GameClass

```ts
class YourGameClass extends GameClass {

}

export default YourGameClass;
```

3. Add SiiUnit decorator to your class. It specifies what unit name in game files it matches (ex. accessory_truck_data)

```ts
@SiiUnit("accessory_truck_data")
class YourGameClass extends GameClass {
}

export default YourGameClass;
```

4. Add attributes to your class with SiiAttribute decorator. It specifies corresponding name of property in game files.

```ts
import SiiAttribute from "./sii-attribute";

@SiiUnit("accessory_truck_data")
class YourGameClass extends GameClass {
    @SiiAttribute("name")
    name: string;

    @SiiAttribute("defaults[]")
    defaults: string[];

    // ...
}

export default YourGameClass;
```

5. Add your new game class to parser options in app.ts
```ts
const parser = new Parser({
    // ...
    gameClassTypes: [
        SomeGameClass,
        SomeOtherGameClass,
        // ...
        YourGameClass
    ],
    // ...
});
```
