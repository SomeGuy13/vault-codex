# Vault Codex
*Programmatic Obsidian*

A primative yet modern self development machine. It is modular and adaptable, revolving around one core system:
> Everything is a markdown page, with custom compoents that define it.
Its like obsidian, but allows for more programmatic integration directly 

Components can do different things, such as be a button that executes a function, a forum to create a task, etc. The goal is to make fast and easy to automate self development through plugins. Each page on the site is a collection of components which can make the page be anything. From a to do list, to a workout plan, to a game to play. Each one has plugins of components.

Everything is navigated through a terminal, which is used to navigate and interract with the files within the vault. In the future there is also an option to just have a UI to do this, but a terminal sounds cool ok?

The terminal has the following commnads:
 - `ls` - lists all the files in the current directory
 - `cd` - changes the directory to the one the user is in
 - `mkdir` - creates a folder in the current directory with a provided name
 - `mkfile` - creates a markdown file for the user to edit
 - `open` - opens a provided file
 - `cn` - changes a file or directories name
 - `rm` - removes a file
 - `rmdir` - removes a directory

 Components can add their own commands to the files the user is browsing.

 Markdown rendering is as follows:
 "---" - Marks a section for properties and is not rendered but can be read to access data
 "#..." Denotes a heading type
 "*" Denotes italicized text
 "**" Denotes bold text
 "***" Creates highlighted text
 "[]" Can be used to link to another file to open when clicked
 "{}" Can be used to insert a varaible from data
 "<Component param={""}>" inserts a component defined in `components`
 "-" Creates a bulleted list
 "[x]" creates a checkbox
 "```" Creates a code block

 Components can add more special markdown rendering properties