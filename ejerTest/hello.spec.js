import {hello} from "./hello"

describe("My first test suite", ()=> {
    test("hello world", () => {
        expect(hello()).toBe("hello");
    })
})