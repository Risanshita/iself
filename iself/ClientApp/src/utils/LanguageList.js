const LanguageList = [
  { value: "oneC (1c)", name: "oneC (1c)" },
  { value: "abnf", name: "abnf" },
  { value: "accesslog", name: "accesslog" },
  { value: "actionscript", name: "actionscript" },
  { value: "ada", name: "ada" },
  { value: "angelscript", name: "angelscript" },
  { value: "apache", name: "apache" },
  { value: "applescript", name: "applescript" },
  { value: "arcade", name: "arcade" },
  { value: "arduino", name: "arduino" },
  { value: "armasm", name: "armasm" },
  { value: "asciidoc", name: "asciidoc" },
  { value: "aspectj", name: "aspectj" },
  { value: "autohotkey", name: "autohotkey" },
  { value: "autoit", name: "autoit" },
  { value: "avrasm", name: "avrasm" },
  { value: "awk", name: "awk" },
  { value: "axapta", name: "axapta" },
  { value: "bash", name: "bash" },
  { value: "basic", name: "basic" },
  { value: "bnf", name: "bnf" },
  { value: "brainfuck", name: "brainfuck" },
  { value: "cLike (c-like)", name: "cLike (c-like)" },
  { value: "c", name: "c" },
  { value: "cal", name: "cal" },
  { value: "capnproto", name: "capnproto" },
  { value: "ceylon", name: "ceylon" },
  { value: "clean", name: "clean" },
  { value: "clojureRepl (clojure-repl)", name: "clojureRepl (clojure-repl)" },
  { value: "clojure", name: "clojure" },
  { value: "cmake", name: "cmake" },
  { value: "coffeescript", name: "coffeescript" },
  { value: "coq", name: "coq" },
  { value: "cos", name: "cos" },
  { value: "cpp", name: "cpp" },
  { value: "crmsh", name: "crmsh" },
  { value: "crystal", name: "crystal" },
  { value: "csharp", name: "csharp" },
  { value: "csp", name: "csp" },
  { value: "css", name: "css" },
  { value: "d", name: "d" },
  { value: "dart", name: "dart" },
  { value: "delphi", name: "delphi" },
  { value: "diff", name: "diff" },
  { value: "django", name: "django" },
  { value: "dns", name: "dns" },
  { value: "dockerfile", name: "dockerfile" },
  { value: "dos", name: "dos" },
  { value: "dsconfig", name: "dsconfig" },
  { value: "dts", name: "dts" },
  { value: "dust", name: "dust" },
  { value: "ebnf", name: "ebnf" },
  { value: "elixir", name: "elixir" },
  { value: "elm", name: "elm" },
  { value: "erb", name: "erb" },
  { value: "erlangRepl (erlang-repl)", name: "erlangRepl (erlang-repl)" },
  { value: "erlang", name: "erlang" },
  { value: "excel", name: "excel" },
  { value: "fix", name: "fix" },
  { value: "flix", name: "flix" },
  { value: "fortran", name: "fortran" },
  { value: "fsharp", name: "fsharp" },
  { value: "gams", name: "gams" },
  { value: "gauss", name: "gauss" },
  { value: "gcode", name: "gcode" },
  { value: "gherkin", name: "gherkin" },
  { value: "glsl", name: "glsl" },
  { value: "gml", name: "gml" },
  { value: "go", name: "go" },
  { value: "golo", name: "golo" },
  { value: "gradle", name: "gradle" },
  { value: "groovy", name: "groovy" },
  { value: "haml", name: "haml" },
  { value: "handlebars", name: "handlebars" },
  { value: "haskell", name: "haskell" },
  { value: "haxe", name: "haxe" },
  { value: "hsp", name: "hsp" },
  { value: "htmlbars", name: "htmlbars" },
  { value: "http", name: "http" },
  { value: "hy", name: "hy" },
  { value: "inform7", name: "inform7" },
  { value: "ini", name: "ini" },
  { value: "irpf90", name: "irpf90" },
  { value: "isbl", name: "isbl" },
  { value: "java", name: "java" },
  { value: "javascript", name: "javascript" },
  { value: "jbossCli (jboss-cli)", name: "jbossCli (jboss-cli)" },
  { value: "json", name: "json" },
  { value: "juliaRepl (julia-repl)", name: "juliaRepl (julia-repl)" },
  { value: "julia", name: "julia" },
  { value: "kotlin", name: "kotlin" },
  { value: "lasso", name: "lasso" },
  { value: "latex", name: "latex" },
  { value: "ldif", name: "ldif" },
  { value: "leaf", name: "leaf" },
  { value: "less", name: "less" },
  { value: "lisp", name: "lisp" },
  { value: "livecodeserver", name: "livecodeserver" },
  { value: "livescript", name: "livescript" },
  { value: "llvm", name: "llvm" },
  { value: "lsl", name: "lsl" },
  { value: "lua", name: "lua" },
  { value: "makefile", name: "makefile" },
  { value: "markdown", name: "markdown" },
  { value: "mathematica", name: "mathematica" },
  { value: "matlab", name: "matlab" },
  { value: "maxima", name: "maxima" },
  { value: "mel", name: "mel" },
  { value: "mercury", name: "mercury" },
  { value: "mipsasm", name: "mipsasm" },
  { value: "mizar", name: "mizar" },
  { value: "mojolicious", name: "mojolicious" },
  { value: "monkey", name: "monkey" },
  { value: "moonscript", name: "moonscript" },
  { value: "n1ql", name: "n1ql" },
  { value: "nginx", name: "nginx" },
  { value: "nim", name: "nim" },
  { value: "nix", name: "nix" },
  { value: "nodeRepl (node-repl)", name: "nodeRepl (node-repl)" },
  { value: "nsis", name: "nsis" },
  { value: "objectivec", name: "objectivec" },
  { value: "ocaml", name: "ocaml" },
  { value: "openscad", name: "openscad" },
  { value: "oxygene", name: "oxygene" },
  { value: "parser3", name: "parser3" },
  { value: "perl", name: "perl" },
  { value: "pf", name: "pf" },
  { value: "pgsql", name: "pgsql" },
  { value: "phpTemplate (php-template)", name: "phpTemplate (php-template)" },
  { value: "php", name: "php" },
  { value: "plaintext", name: "plaintext" },
  { value: "pony", name: "pony" },
  { value: "powershell", name: "powershell" },
  { value: "processing", name: "processing" },
  { value: "profile", name: "profile" },
  { value: "prolog", name: "prolog" },
  { value: "properties", name: "properties" },
  { value: "protobuf", name: "protobuf" },
  { value: "puppet", name: "puppet" },
  { value: "purebasic", name: "purebasic" },
  { value: "pythonRepl (python-repl)", name: "pythonRepl (python-repl)" },
  { value: "python", name: "python" },
  { value: "q", name: "q" },
  { value: "qml", name: "qml" },
  { value: "r", name: "r" },
  { value: "reasonml", name: "reasonml" },
  { value: "rib", name: "rib" },
  { value: "roboconf", name: "roboconf" },
  { value: "routeros", name: "routeros" },
  { value: "rsl", name: "rsl" },
  { value: "ruby", name: "ruby" },
  { value: "ruleslanguage", name: "ruleslanguage" },
  { value: "rust", name: "rust" },
  { value: "sas", name: "sas" },
  { value: "scala", name: "scala" },
  { value: "scheme", name: "scheme" },
  { value: "scilab", name: "scilab" },
  { value: "scss", name: "scss" },
  { value: "shell", name: "shell" },
  { value: "smali", name: "smali" },
  { value: "smalltalk", name: "smalltalk" },
  { value: "sml", name: "sml" },
  { value: "sqf", name: "sqf" },
  { value: "sql", name: "sql" },
  { value: "sqlMore (sql_more)", name: "sqlMore (sql_more)" },
  { value: "stan", name: "stan" },
  { value: "stata", name: "stata" },
  { value: "step21", name: "step21" },
  { value: "stylus", name: "stylus" },
  { value: "subunit", name: "subunit" },
  { value: "swift", name: "swift" },
  { value: "taggerscript", name: "taggerscript" },
  { value: "tap", name: "tap" },
  { value: "tcl", name: "tcl" },
  { value: "thrift", name: "thrift" },
  { value: "tp", name: "tp" },
  { value: "twig", name: "twig" },
  { value: "typescript", name: "typescript" },
  { value: "vala", name: "vala" },
  { value: "vbnet", name: "vbnet" },
  {
    value: "vbscriptHtml (vbscript-html)",
    name: "vbscriptHtml (vbscript-html)",
  },
  { value: "vbscript", name: "vbscript" },
  { value: "verilog", name: "verilog" },
  { value: "vhdl", name: "vhdl" },
  { value: "vim", name: "vim" },
  { value: "x86asm", name: "x86asm" },
  { value: "xl", name: "xl" },
  { value: "xml", name: "xml" },
  { value: "xquery", name: "xquery" },
  { value: "yaml", name: "yaml" },
  { value: "zephir", name: "zephir" },
];

export default LanguageList;