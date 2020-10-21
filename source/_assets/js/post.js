import { registerLanguage, initHighlightingOnLoad } from "highlight.js/lib/core";

registerLanguage("php", require("highlight.js/lib/languages/php"));
registerLanguage("diff", require("highlight.js/lib/languages/diff"));
registerLanguage("sql", require("highlight.js/lib/languages/sql"));
registerLanguage("javascript", require("highlight.js/lib/languages/javascript"));

initHighlightingOnLoad();
