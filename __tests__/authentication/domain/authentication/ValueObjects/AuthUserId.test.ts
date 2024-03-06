import {AuthUserId} from "../../../../../src/authentication/domain/ValueObjects/AuthUserId";

describe("UserId Class", () => {

    test("UserIds are equal", () => {
        const Id1 = AuthUserId.create("1");
        const Id2 = AuthUserId.create("1");

        expect(Id1).toEqual(Id2);
        expect(Id1.equals(Id2)).toBe(true);

    });

    test("UserIds are not equal", () => {
        const Id1 = AuthUserId.create("1");
        const Id2 = AuthUserId.create("2");

        const equalize = Id1 === Id2

        expect(equalize).toBe(false);
        expect(Id1.equals(Id2)).toBe(false);

    });

    test("UserId return the correct data", () => {
        const id = AuthUserId.create("1");

        expect(id.value).toBe("1");

    });
});