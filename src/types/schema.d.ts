// src/types/schema.ts
export interface paths {
    '/api/user/login': {
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
                401: {
                    content: {
                        'application/json': {
                            error: string
                        }
                    }
                }
            }
        }
    }
    '/api/user/logout': {
        post: {
            responses: {
                200: {
                    content: {
                        'application/json': {
                            status: string
                        }
                    }
                }
            }
        }
    }
    '/api/user/profile': {
        get: {
            responses: {
                200: {
                    content: {
                        'application/json': {
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
    '/api/user/register': {
        post: {
            requestBody: {
                content: {
                    'application/json': {
                        username: string
                        email: string
                        password: string
                    }
                }
            }
            responses: {
                200: {
                    content: {
                        'application/json': {
                            status: string
                            username: string
                        }
                    }
                }
            }
        }
    }
}
