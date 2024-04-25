import { GetAccessTokenDto } from "../modules/auth/dto/auth-dtos/get-access_token-auth.dto"
import { GetMovieDto } from "../modules/movies/dto/get-movie.dto"


export const GetMovie = {
  status: 200,
  description: 'Consultar Movies',
  type: GetMovieDto
}
export const UserCreated = {
  status: 201,
  description: 'Usuário Criado',
  type: GetAccessTokenDto
}

export const LoginOk = {
  status: 200,
  description: 'Login Ok',
  type: GetAccessTokenDto
}

export const MovieCreated = {
  status: 201,
  description: 'Movie Cadastrado',
  type:GetMovieDto
}
export const GetMovies = {
    status: 200,
    description: 'Consultar Movies',
    type: GetMovieDto,
    isArray:true
}

export const Ok = {
  status: 200,
  description: 'Ok',
}
export const NoContent = {
  status: 204,
  description: 'NoContent',
}
export const ServiceUnavailable = {
  status: 503,
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 503
          },
          message: {
            type: 'string',
            example: 'service unavailable'
          }
        }
      }
    }
  }
}

export const BadRequest = {
    status: 400,
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 400
            },
            message: {
              type: 'string',
              example: 'Campo xpto está inválido'
            },
            error: {
              type: 'string',
              example: 'Bad Request'
            }
          }
        }
      }
    }
  }

  export const Unauthorized = {
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'number',
              example: 401
            },
            message: {
              type: 'string',
              example: 'Não autorizado'
            }
          }
        }
      }
    }
  }

export const Conflict = {
  status: 409,
  description: 'Conflict',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 409
          },
          message: {
            type: 'string',
            example: 'Já existe um usuário com este email.'
          },
          error: {
            type: 'string',
            example: 'Conflict'
          }
        }
      }
    }
  }
}

export const NotFound = {
  status: 404,
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 404
          },
          message: {
            type: 'string',
            example: "O id informado não corresponde ao id de nenhum Movie cadastrado"
          },
          error: {
            type: 'string',
            example: "Not Found"
          }
        }
      }
    }
  }
}

export const InternalServerError = {
  status: 500,
  description: 'Internal server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 500
          },
          message: {
            type: 'string',
            example: 'Internal server error'
          }
        }
      }
    }
  }
}