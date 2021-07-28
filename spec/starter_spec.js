// ArgParser
// 
// Input: [schema - [?], argList - array of String]
// Output: ?


class ArgParser {
  constructor (schema) {
    this.schema = schema
  }

  validate(argsList){
    // check schema to see if arg in allowed flags
    const arg = argsList[0]?.slice(1)

    if (arg) {
      // there are args
      if (this.schema.map((x) => x.letter).indexOf(arg) == -1) {
        return false
      } else {
        return true
      }
    } else {
      // no args
      return true
    }
  }
}

describe('An Args Parser', () => {
  it('should validate an empty schema against an empty argument list', () => {
    const schema = []
    const argsList = []
    const myArgParser = new ArgParser(schema)
    expect(myArgParser.validate(argsList)).toBe(true)
  })
  
  it('if there is one valid flag in the schema, but no arguments then valid', () => {
    const schema = ['a']
    const argsList = []
    const myArgParser = new ArgParser(schema)
    expect(myArgParser.validate(argsList)).toBe(true)
  })

  it('if there schema is empty, any arguments are invalid', () => {
    const schema = []
    const argsList = ['-a']
    const myArgParser = new ArgParser(schema)
    expect(myArgParser.validate(argsList)).toBe(false)
  })

  it('if the args list contains "a", and so does the schema: valid', () => {
    const schema = [{letter: 'a', type: 'boolean'}]
    const argsList = ['-a']
    const myArgParser = new ArgParser(schema)
    expect(myArgParser.validate(argsList)).toBe(true)
  })
})



