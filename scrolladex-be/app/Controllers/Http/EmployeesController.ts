import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Employee from 'App/Models/Employee'
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import fs from 'fs'
import path from 'path'

interface Updates {
  title?: any;
  first_name?: any;
  last_name?: any;
  emp_no?: any;
  job_title?: any;
  department_id?: any;
  telephone?: any;
  email?: any;
  profile_picture_url?: string;
}


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

  public async overview({ request, response }: HttpContextContract) {
    const searchField = request.input('search_field');
    const searchValue = request.input('search_value');
    let query = Employee.query()
        .select('id', 'title', 'first_name', 'last_name', 'job_title', 'department_id', "profile_picture_url")
        .preload('department', (query) => query.select('id', 'department_name'))
        .orderBy('last_name', 'asc');
  
        if (searchField && searchValue) {
          if (searchField === 'department_id') {
            query = query.where(searchField, '=', searchValue);
          }
          else {
            query = query.where(searchField, 'like', `%${searchValue}%`);
          }
        }

    const employees = await query;
    const employeesWithDepartment = employees.map((employee) => {
        return {
            id: employee.id,
            title: employee.title,
            first_name: employee.first_name,
            last_name: employee.last_name,
            job_title: employee.job_title,
            department_id: employee.department_id,
            profile_picture_url: employee.profile_picture_url,
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
    // Create user entry
    let baseUsername = `${employeeData.first_name?.charAt(0)}${employeeData.last_name}`.toLowerCase();
    let username = baseUsername;
    let usernameExists = true;
    while(usernameExists) {
      const existingUser = await User.query().where('username', username).first();
      if (existingUser) {
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        username = `${baseUsername}${randomNumber}`;
      } else {
        usernameExists = false;
      }
    }
    // Function to generate a random password
    const generateRandomPassword = (length = 8) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0;i  < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    }
    // Generate a random password
    const randomPassword = generateRandomPassword();
    // Create user
    const user = new User();
    user.username = username;
    user.password = randomPassword;
    user.employee_id = employee.id;
    await user.save();
    return response.json({ employee, user });
  }

  public async show ({ params, response }: HttpContextContract) {
    const employee = await Employee.query()
      .select('id', 'title', 'first_name', 'last_name', 'job_title', 'department_id', "telephone", "emp_no", "email", "profile_picture_url")
      .where('id', params.id)
      .preload('department', query => query.select('id', 'department_name'))
      .first()
  
    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' })
    }
  
    const employeeWithDepartmentName = {
      id: employee.id,
      title: employee.title,
      first_name: employee.first_name,
      last_name: employee.last_name,
      job_title: employee.job_title,
      department_id: employee.department_id,
      profile_picture_url: employee.profile_picture_url,
      department_name: employee.department.department_name,
      telephone: employee.telephone,
      email: employee.email,
      emp_no: employee.emp_no,
    }
  
    return response.json(employeeWithDepartmentName)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const profilePicture = request.file('profile_picture', {
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg'],
    });
    
    const employee = await Employee.find(params.id);
    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    
    const updates : Updates = request.only([
      'title', 
      'first_name', 
      'last_name', 
      'emp_no', 
      'job_title', 
      'department_id', 
      'telephone', 
      'email',
    ]);
    
    if (profilePicture) {
      const fileName = `${new Date().getTime()}.${profilePicture.extname}`;
      const newProfilePicturePath = `/uploads/${fileName}`;

      if (employee.profile_picture_url) {
        const oldProfilePicturePath = path.join(Application.publicPath(), employee.profile_picture_url);
        if (fs.existsSync(oldProfilePicturePath)) {
          await fs.promises.unlink(oldProfilePicturePath);
        }
      }

      await profilePicture.move(Application.publicPath('uploads'), {
        name: fileName,
        overwrite: true,
      });

      updates.profile_picture_url = newProfilePicturePath;
    }
  
    employee.merge(updates);
    await employee.save();
    
    return response.json(employee);
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const employee = await Employee.find(params.id);
    if (employee) {
      await employee.delete();
      return response.status(200);
    } else {
      return response.status(404);
    }
  }  
}
