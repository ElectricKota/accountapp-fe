// schema.d.ts

export interface paths {
    '/login': {
        post: {
            requestBody: {
                content: {
                    'application/json': {
                        username: string
                        password: string
                    }
                }
            }
            responses: {
                200: {
                    content: {
                        'application/json': {
                            accessToken: string
                            expiresIn: number
                            user: {
                                id: number
                                username: string
                                email: string
                                role: string
                            }
                        }
                    }
                }
            }
        }
    }
}
