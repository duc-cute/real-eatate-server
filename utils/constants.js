/** @format */
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const hashPassword = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
module.exports = {
  roles: [
    {
      code: "ROL1",
      value: "Admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL3",
      value: "Owner",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL5",
      value: "Agent",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL7",
      value: "User",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: Array.from([...Array(10).keys()]).map((index) => ({
    name: faker.person.fullName(),
    phone: "0" + faker.string.numeric(9),
    address: faker.location.streetAddress({ useFullAddress: true }),
    email: faker.internet.email({ provider: "gmail.com" }),
    password: hashPassword("12345678"),
    avatar: faker.image.avatar(),
    refreshToken: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  userRoles: [
    ...Array.from([...Array(10).keys()]).map((el) => ({
      userId: el + 1,
      roleCode: "ROL7",
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {
      userId: 5,
      roleCode: "ROL3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 6,
      roleCode: "ROL5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 7,
      roleCode: "ROL5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 8,
      roleCode: "ROL3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 9,
      roleCode: "ROL5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 10,
      roleCode: "ROL1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  propertyTypes: [
    {
      name: "House",
      description: faker.lorem.sentences({ min: 1, max: 2 }),
      image: faker.image.urlLoremFlickr({
        width: 800,
        height: 600,
        category: "house",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Apartment",
      description: faker.lorem.sentences({ min: 1, max: 2 }),
      image: faker.image.urlLoremFlickr({
        width: 800,
        height: 600,
        category: "apartment",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Townhouse",
      description: faker.lorem.sentences({ min: 1, max: 2 }),
      image: faker.image.urlLoremFlickr({
        width: 800,
        height: 600,
        category: "townhouse",
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  properties: Array.from(Array(60).keys()).map(() => ({
    name: faker.lorem.sentences({ min: 1, max: 2 }),
    description: faker.lorem.sentences({ min: 2, max: 5 }),
    listingType: faker.helpers.arrayElement(["SALE", "RENTAL"]),
    price: faker.number.int({ min: 1000, max: 100000 }),
    propertyTypeId: faker.number.int({ min: 1, max: 3 }),
    status: "PENDING",
    address: faker.location.streetAddress({ useFullAddress: true }),
    images: JSON.stringify(
      Array.from(Array(faker.number.int({ min: 3, max: 6 })).keys()).map(() =>
        faker.image.urlLoremFlickr({
          width: 800,
          height: 600,
          category: "real_estate",
        })
      )
    ),
    isAvailable: true,
    postedBy: faker.helpers.arrayElement([6, 7, 9]),
    thumb: faker.image.urlLoremFlickr({
      width: 800,
      height: 600,
      category: "real_estate",
    }),
    bathRoom: faker.number.int({ min: 1, max: 5 }),
    bedRoom: faker.number.int({ min: 1, max: 3 }),
    propertySize: faker.number.int({ min: 200, max: 500 }),
    yearBuilt: faker.number.int({ min: 1970, max: 2024 }),
    owner: faker.helpers.arrayElement([5, 8]),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  feature: [
    {
      name: "Air Conditioning",
      image: faker.image.urlLoremFlickr({ category: "conditioning" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Furnace",
      image: faker.image.urlLoremFlickr({ category: "furnace" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Garage",
      image: faker.image.urlLoremFlickr({ category: "furnace" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Pool",
      image: faker.image.urlLoremFlickr({ category: "pool" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  propertyFeature: Array.from(Array(60).keys()).map((index) => ({
    propertyId: index + 1,
    featureId: faker.number.int({ min: 1, max: 4 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
};
