import { faker } from "@faker-js/faker";
import { prisma } from "./prisma";
import { addManyBooks } from "@/app/actions/bookActions";

export async function initializeDB() {
    const count = await prisma.book.count();
    const isDataExist = count !== 0 ? true : false;

    if (!isDataExist) {
        console.log("✔️ Book 테이블이 비어 있습니다. 데이터를 초기화합니다..");
        // 검색창 테스트용 책 제목
        const commonTitles = [
            "Shadow",
            "Light",
            "Dream",
            "Storm",
            "Echo",
            "Whisper",
            "Fire",
            "Secret",
            "Legend",
            "Destiny",
        ];

        // 검색창 테스트용 저자 이름
        const commonAuthors = [
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Garcia",
            "Miller",
            "Davis",
            "Rodriguez",
            "Martinez",
        ];

        const getRandomElement = (arr: string[]) =>
            arr[Math.floor(Math.random() * arr.length)];

        const getRandomPrice = () => {
            const number = faker.datatype.number({ min: 10, max: 20 });
            return number * 1000;
        };

        const BOOKS = Array.from({ length: 105 }, (_, i) => ({
            title: `${getRandomElement(commonTitles)} ${faker.lorem.words(3)}`,
            author: `${getRandomElement(
                commonAuthors
            )} ${faker.name.fullName()}`,
            genre: faker.music.genre(),
            content: faker.lorem.words(30),
            price: getRandomPrice(),
            quantity: faker.datatype.number(100),
            publisher: faker.company.name(),
            rate: faker.datatype.number({ min: 2, max: 10 }),
            imageUrl: `https://picsum.photos/seed/${i + 1}/300/200`,
        }));

        await addManyBooks(BOOKS);
        console.log("✅ 초기 데이터 삽입 완료!");
    } else {
        console.log(
            `✅ 이미 Book 테이블에 ${count}개의 데이터가 존재합니다. 초기화를 생략합니다.`
        );
    }
}
