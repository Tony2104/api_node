import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { db } from "../database/client.ts"
import { courses } from "../database/schema.ts"
import z from "zod"

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/courses",
		{
			schema: {
				tags: ["Courses"],
				summary: "Create a Course",
				body: z.object({ title: z.string() }),
				response: {
					201: z
						.object({
							courseId: z.uuid(),
						})
						.describe("Curso criado com sucesso!"),
				},
			},
		},
		async (req, reply) => {
			const courseTitle = req.body.title
			// const courseDescription = req.body.description

			// if (!courseTitle) {
			// 	return reply.status(400).send({ message: "Título Obrigatório!" })
			// }

			const result = await db
				.insert(courses)
				.values({ title: courseTitle })
				.returning()

			return reply.status(201).send({ courseId: result[0].id })
		}
	)
}
