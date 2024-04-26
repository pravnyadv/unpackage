function init() {
  const editor = CodeMirror(document.querySelector(".block-code"), {
    lineNumbers: true,
    autofocus: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "application/ld+json",
    lineWrapping: true,
    indent: true,
  });

  return {
    loading: false,
    failed: "",
    success: "",

    showMessage(msg, type = "success") {
      if (type == "success") {
        this.success = msg;
      } else {
        this.failed = msg;
      }

      // hide alert after 2 seconds
      setTimeout((e) => {
        this.failed = null;
        this.success = null;
      }, 2000);
    },

    clear() {
      editor.setValue("");
    },

    unpack() {
      try {
        const pkg = new Pkg(editor.getValue());
        if (!pkg.isCodeValid()) {
          throw "Invalid Code";
        }

        const package = pkg.process();
        if (!package) {
          throw "Unable to convert to package.json";
        }
        editor.setValue(JSON.stringify(package));
      } catch (err) {
        this.showMessage(err, "error");
      } finally {
        this.loading = false;
      }
    },
  };
}
