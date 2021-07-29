// ArgParser
//
// Input: [schema - [?], argList - array of String]
// Output: ?

class ArgParser {
  constructor(schema) {
    this.schema = schema;
  }

  validate(argsList) {
    // check schema to see if arg in allowed flags
    const FIRST = 0;
    const FOUND = 0;
    const EMPTY = 0;

    if (argsList.length === EMPTY) {
      return true;
    }
    // there are args

    const stripInitialHyphen = (x) => x.slice(1);
    const listOfFlags = this.schema.map((x) => x.letter)

    const arg = stripInitialHyphen(argsList[FIRST]);

    return listOfFlags.indexOf(arg) >= FOUND
  }
}

describe("An Args Parser", () => {
  it("should validate an empty schema against an empty argument list", () => {
    const schema = [];
    const argsList = [];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(true);
  });

  it("if there is one valid flag in the schema, but no arguments then valid", () => {
    const schema = ["a"];
    const argsList = [];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(true);
  });

  it("if there schema is empty, any arguments are invalid", () => {
    const schema = [];
    const argsList = ["-a"];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(false);
  });

  it('if the args list contains "a", and so does the schema: valid', () => {
    const schema = [{ letter: "a", type: "boolean" }];
    const argsList = ["-a"];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(true);
  });

  it('if the args list contains "a", and the schema doesn\'t: invalid', () => {
    const schema = [{ letter: "a", type: "boolean" }];
    const argsList = ["-c"];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(false);
  });

  it('if there is an argument that is not in the schema, then invalid', () => {
    const schema = [{ letter: "a", type: "boolean" }];
    const argsList = ["-c"];
    const myArgParser = new ArgParser(schema);
    expect(myArgParser.validate(argsList)).toBe(false);
  });
});
