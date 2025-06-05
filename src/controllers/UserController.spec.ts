import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn(),
        deleteUser: jest.fn()
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Nath',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve estourar mensagem de erro por não passar o usuario', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'nath@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' })
    })

    it('Deve chamar a função getAllUsers', () => {
        const mockRequest = {
            body: {
                name: 'Testenildo',
                email: 'testenildo@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        const mockGetAllUsers = jest.spyOn(mockUserService, 'getAllUsers')
        expect(mockGetAllUsers).toHaveBeenCalled()
    })

    it('Deve estourar mensagem de erro por não informar o email', () => {
        const mockRequest = {
            body: {
                name: 'Testenildo',
                email: ''
            }
        } as Request
         const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' })
    })

    it('Deve estourar um erro ao deletar por não informar o email', () => {
        const mockRequest = {
            body: {
                name: ''
            }
        } as Request
         const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' })
    })

    it('Deve deletar um usuário com sucesso', () => {
        const mockRequest = {
            params: {
                email: 'teste@teste.com'
            }
        } as unknown as Request
         const mockResponse = makeMockResponse()
        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    })
})
