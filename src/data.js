export const users = [
  {
    id: "1",
    name: "Gene Kranz",
    email: "gene@nasa.gov",
    password: "12345",
    roles: ["director"],
    permissions: ["read:any_user", "read:own_user"],
  },
  {
    id: "2",
    name: "Neil Armstrong",
    email: "neil@nasa.gov",
    password: "67890",
    roles: ["astronaut"],
    permissions: ["read:own_user"],
  },
];
