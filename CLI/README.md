# SiiParser

App for parsing .sii files' data.

## Arguments

 - ```-r (--root-dir)``` - Game files root directory, see: https://modding.scssoft.com/wiki/Documentation/Engine/Game_data section "Root Game Folder"
 - ```-f (--file-path)``` - Path to file that needs to be parsed
 - ```-d (--dir-path)``` - Path to directory that has .sii files that need to be parsed

## Warning

This app is missing lots of classes that exist in game files. I only added these that I needed. Probably you have to add some yourself and recompile the CLI.

Same thing may be needed for value types, there are only few defined.