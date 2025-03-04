import { getRandomPrice } from "@/lib/serverInit";
import { Book } from "@/model/book";
import { faker } from "@faker-js/faker";

export function makeDummyData(type: keyof Book) {
    switch (type) {
        case "title":
            return faker.lorem.words(3);
        case "author":
            return faker.name.fullName();
        case "genre":
            return faker.music.genre();
        case "content":
            return faker.lorem.words(30);
        case "price":
            return getRandomPrice();
        case "quantity":
            return faker.datatype.number(100);
        case "publisher":
            return faker.company.name();
        case "rate":
            return faker.datatype.number({ min: 2, max: 10 });
        default:
            return "";
    }
}
