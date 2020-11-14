# `contract shark monitor`


### Setup

```
$ ./node_modules/.bin/wsrun
wsrun [options] -c <command> [<arg1> <arg2> ...]

Mode (choose one):
  --parallel, -a  Fully parallel mode (default)                                                                                         [boolean]
  --stages, -t    Run in stages: start with packages that have no deps                                                                  [boolean]
  --serial, -s    Same as "stages" but with no parallelism at the stage level                                                           [boolean]

Package Options:
  --recursive, -r  Execute the same script on all of its dependencies, too                                             [boolean] [default: false]
  --package, -p    Run only for packages matching this glob. Can be used multiple times.                                                  [array]
  --changedSince   Runs commands in packages that have changed since the provided source control branch.                                 [string]

Misc Options:
  --if                   Run main command only if this condition runs successfully
  --ifDependency         Run main command only if packages dependencies passed the condition (not available in parallel mode)           [boolean]
  --fast-exit, -e        If at least one script exits with code > 0, abort                                             [boolean] [default: false]
  --collect-logs, -l     Collect per-package output and print it at the end of each script                             [boolean] [default: false]
  --no-prefix
  --rewrite-paths        Rewrite relative paths in the standard output, by prepending the <root_folder>/<package_name>.[boolean] [default: false]
  --bin                  The program to pass the command to                                                            [string] [default: "yarn"]
  --done-criteria        Consider a process "done" when an output line matches the specified RegExp
  --exclude, -x          Skip running the command for that package                                                                       [string]
  --exclude-missing, -m  Skip packages which lack the specified command in the scripts section of their package.json   [boolean] [default: false]
  --report               Show an execution report once the command has finished in each package                        [boolean] [default: false]

Other Options:
  --help             Show help                                                                                                          [boolean]
  --version          Show version number                                                                                                [boolean]
  -c                 Denotes the end of the package list and the beginning of the command. Can be used instead of "--"                  [boolean]
  --revRecursive     Include all dependents of the filtered packages. Runs after resolving the other package options.  [boolean] [default: false]
  --prefix           Prefix output with package name                                                                    [boolean] [default: true]
  --concurrency, -y  Maximum number of commands to be executed at once                                                                   [number]

Examples:
  wsrun clean                                      Runs "yarn clean" in each of the packages in parallel
  wsrun -p app -r --stages build                   Runs "yarn build" in app and all of its dependencies in stages, moving up the dependency tree
  wsrun --stages --done-criteria="Finished" watch  Runs "yarn watch" in each of the packages in stages, continuing when the process outputs
                                                   "Finished"
  wsrun --exclude-missing test                     Runs "yarn test" in all packages that have such a script
```

## Usage


## License 

MIT
