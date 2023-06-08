import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'

export default class EmployeesController {
  public async index ({ response }: HttpContextContract) {
    const employees = await Employee.query().preload('department')
  
    const employeesWithProfilePictures = employees.map((employee) => {
      const profile_picture_url = employee.profile_picture_url ? 
        `${Env.get('APP_URL')}/uploads/${employee.profile_picture_url}` : null;
  
      return {
        ...employee.toJSON(),
        profile_picture_url
      };
    });
  
    return response.json(employeesWithProfilePictures);
  }

  public async overview ({ response }: HttpContextContract) {
    const employees = await Employee.query()
      .select('id', 'title', 'first_name', 'last_name', 'job_title', 'department_id', "profile_picture_url")
      .preload('department'); 
  
    const employeesWithDepartment = employees.map((employee) => {
      return {
        ...employee.serialize(), 
        department_name: employee.department.department_name, 
      };
    });
  
    return response.json(employeesWithDepartment);
  }
  
  
  public async store({ request, response }: HttpContextContract) {
    const profilePicture = request.file('profile_picture', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    })
  
    const employeeData: Partial<Employee> = request.only([
      'title',
      'first_name',
      'last_name',
      'emp_no',
      'job_title',
      'department_id',
      'telephone',
      'email',
    ])
  
    if (profilePicture) {
      const fileName = `${new Date().getTime()}.${profilePicture.extname}`
      await profilePicture.move(Application.publicPath('uploads'), {
        name: fileName,
        overwrite: true,
      })
      employeeData.profile_picture_url = `/uploads/${fileName}`
    }
  
    const employee = await Employee.create(employeeData as Employee)
    return response.json(employee)
  }
  
  public async show ({ params, response }: HttpContextContract) {
    const employee = await Employee.query().where('id', params.id).preload('department').first()
    return response.json(employee)
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const employeeData = request.only(['title', 'first_name', 'last_name', 'emp_no', 'job_title', 'department_id', 'telephone', 'email', 'profile_picture_url'])
    const employee = await Employee.find(params.id)
    if (employee) {
      employee.merge(employeeData)
      await employee.save()
    }
    return response.json(employee)
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const employee = await Employee.find(params.id)
    if (employee) {
      await employee.delete()
    }
    return response.json(employee)
  }
}
