// class to process package-lock.json
class Pkg {
  constructor(code) {
    this.code = code;
    this.error = "";
    this.package = {};
  }

  isCodeValid() {
    if (!this.code) {
      return false;
    }

    try {
      JSON.parse(this.code);
    } catch (e) {
      return false;
    }
    return true;
  }

  process() {
    try {
      let json = JSON.parse(this.code);
      if (!json.packages) {
        throw "Invalid package-lock.json";
      }

      const dependencies = json.packages[""];
      this.package.name = dependencies.name || "Unpackage";
      this.package.version = dependencies.version || "1.0.0";

      // get dependencies
      Object.keys(dependencies).forEach((element) => {
        this.package[element] = dependencies[element];
      });

      return this.package;
    } catch (err) {
      this.error = err;
      return false;
    }
  }
}
