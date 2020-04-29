const supertest = require("supertest");
const app = require("./app");
const request = supertest(app)

describe("System test", () => {
    test("System test", async () => {

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7InJvbGUiOiJhZG1pbiIsImF1dGhvcklkIjoiNWVhOTY2NTAxNDM2ZTExMzY2YjlkMjVjIiwidXNlcm5hbWUiOiJhZG1pbjEifSwiaWF0IjoxNTg4MTc2MTM2fQ.AJW2YyQ7BMUAs5EBz3ZI4qjDztGiU5uJakd_Pp5VNvM";

        const getPosts = await request.get("/api/posts").expect(200)
        expect(getPosts.body.length).toBeGreaterThan(0);


        const createPost = await request.post("/api/posts")
            .set("Accept", "aplication/json")
            .set("Authorization", "bearer " + token)
            .send({
                "author": "admin",
                "nickname": "Helen",
                "title": "title",
                "content": "lorem ipsum"
            })
            .expect(200)
        expect(createPost.body.title).toBe("title");


        const postId = createPost.body._id;
        const getPostId = await request.get(`/api/posts/${postId}`).expect(200)
        expect(getPostId.body.title).toBe("title");


        const updatePost = await request.put(`/api/posts/${postId}`)
            .set("Accept", "aplication/json")
            .set("Authorization", "bearer " + token)
            .send({
                "author": "admin",
                "nickname": "Helen",
                "title": "titlee",
                "content": "lorem ipsum"
            })
            .expect(200)
        expect(updatePost.body.title).toBe("titlee");


        const deletePostId = await request.delete(`/api/posts/${postId}`).expect(200)
            .set("Accept", "aplication/json")
            .set("Authorization", "bearer " + token)
        expect(deletePostId).not.toBe(null);

        const getPostId2 = await request.get(`/api/posts/${postId}`).expect(404)
        expect(getPostId2.body.title).not.toBe("titlee");

    })
})