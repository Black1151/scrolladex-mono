import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'

export default class DepartmentsController {
  public async index ({ response }: HttpContextContract) {
    const departments = await Department.all()
    return response.json(departments)
  }

  public async showWithEmployees({ params, response }: HttpContextContract) {
    try {
      const department = await Department.query()
        .where('id', params.id)
        .preload('employees', (query) => {
          query.select('id', 'title', 'first_name', 'last_name', 'job_title')
        })
        .firstOrFail()

      return response.json(department)
    } catch (error) {
      return response.status(404).json({ message: 'Department not found' })
    }
  }

  public async dropdown ({ response }: HttpContextContract) {
    const departments = await Department.query().select('id', 'department_name').orderBy('department_name', "asc")
    return response.json(departments)
  }  

  public async store ({ request, response }: HttpContextContract) {
    const departmentData = request.only(['department_name', 'address_line_one', 'address_line_two', 'town', 'county', 'postcode'])
    const department = await Department.create(departmentData)
    return response.json(department)
  }

  public async show ({ params, response }: HttpContextContract) {
    const department = await Department.find(params.id)
    return response.json(department)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const departmentData = request.only(['department_name', 'address_line_one', 'address_line_two', 'town', 'county', 'postcode'])
    const department = await Department.find(params.id)
    if (department) {
      department.merge(departmentData)
      await department.save()
    }
    return response.json(department)
  }
  
  public async destroy ({ params, response }: HttpContextContract) {
    const department = await Department.find(params.id)
    if (department) {
      await department.delete()
    }
    return response.json(department)
  }
}
