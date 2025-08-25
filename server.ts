import fastify from "fastify"
import {
	validatorCompiler,
	serializerCompiler,
	type ZodTypeProvider,
	jsonSchemaTransform,
} from "fastify-type-provider-zod"
import { fastifySwagger } from "@fastify/swagger"
import { getCoursesRoute } from "./src/routes/get-courses.ts"
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts"
import { createCourseRoute } from "./src/routes/create-course.ts"
import scalarApiReferenceFastify from "@scalar/fastify-api-reference"

const server = fastify({
	logger: {
		enabled: true,
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV === "development") {
	server.register(fastifySwagger, {
		openapi: { info: { title: "Desafio Node.js", version: "1.0.0" } },
		transform: jsonSchemaTransform,
	})

	server.register(scalarApiReferenceFastify, {
		routePrefix: "/docs",
		configuration: {
			theme: "bluePlanet",
		},
	})
}

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(getCoursesRoute)
server.register(getCourseByIdRoute)
server.register(createCourseRoute)

server.listen({ port: 3000 }).then(() => {
	console.log("Servidor ligado!")
})
