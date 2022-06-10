import express from 'express'
import { v4 as uuidv4} from 'uuid'
import jwt from 'jsonwebtoken'

const SECRET = 'vitordel'

import courses from '../src/database/courses.json' assert {type: "json"}
import blacklist from '../src/database/blacklist.json' assert {type: "json"}


export const getCourses = (req, res) => {
    res.send(courses)
}

export const createCourse = (req, res) => {
    const course = req.body

    courses.push(course)
    //courses.push({ ...course, id: uuidv4() })
    res.send(`Curso com id '${course.id}' e nome '${course.curso_detalhe.curso.curso}' foi adicionado à base de dados!`)
}

export const getCourseById = (req, res) => {

    const { id } = req.params

    const course = courses.find((course) => course.id === parseInt(id))
    if (!course) res.send('Não há curso com esse ID!')

    res.send(course)
}

export const deleteCourse = (req, res) => {
    const id = req.params.id

    const course = courses.find(course => course.id === parseInt(id))
    if (!course) res.status(404).send('Não existe um curso com esse ID!')

    const index = courses.indexOf(course);
    courses.splice(index, 1)

    res.send(`Curso com id '${id}' e nome '${course.curso_detalhe.curso.curso}' foi deletado da base de dados!`)
}

export const updateCourse = (req, res) => {
    const { id } = req.params
    const { valor_original, turno, duracao, duracao_tipo, desconto } = req.body
    const { categoria_especifica } = req.body.curso_detalhe
    const { curso } = req.body.curso_detalhe.curso
    const { cidade } = req.body.campus
    const { instituicao, imagem } = req.body.campus.instituicao
    const { modalidade } = req.body.modalidade

    const course = courses.find((course) => course.id === parseInt(id))
    if (!course) res.send('Não há curso com esse ID!')
    
    if(valor_original) course.valor_original = valor_original
    if(turno) course.turno = turno
    if(duracao) course.duracao = duracao
    if(duracao_tipo) course.duracao_tipo = duracao_tipo
    if(desconto) course.desconto = desconto
    
    if(categoria_especifica) course.curso_detalhe.categoria_especifica = categoria_especifica
    if(curso) course.curso_detalhe.curso.curso = curso
    
    if(cidade) course.campus.cidade = cidade
    if(instituicao) course.campus.instituicao.instituicao = instituicao
    if(imagem) course.campus.instituicao.imagem = imagem
    if(modalidade) course.modalidade.modalidade = modalidade
    
    res.send(`Curso com id '${id}' e nome '${course.curso_detalhe.curso.curso}' foi atualizado na base de dados!`)
}

export const login = (req,res) => {
    if (req.body.user === 'vitor' && req.body.password === '123abc') {
        const token = jwt.sign({userId: 1}, SECRET, { expiresIn: 300})
        return res.json({ auth: true, token })
    }

    res.status(401).end()
}

export const logout = function (req, res) {
    res.end()
}

export const clientes = (req, res) => {
    console.log(req.userId + ' fez esta chamada!')
    res.json([{ id: 1, nome: 'vitor'}])
}

export function verifyJWT (req, res, next){
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (err, decoded) => {

        if(err) return res.status(401).end()

        req.userId = decoded.userId
        next()
    })
}
