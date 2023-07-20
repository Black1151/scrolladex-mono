import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Employee from 'App/Models/Employee'

export default class EmployeeSeeder extends BaseSeeder {
  public async run () {

    const men = [
        { first_name: "Alan", last_name: "Johnson", department_id: 1, job_title: "Paralegal", title: "Mr." },
        { first_name: "Bob", last_name: "Smith", department_id: 2, job_title: "Receptionist", title: "Mr." },
        { first_name: "Charles", last_name: "Bennet", department_id: 3, job_title: "Lead Generator", title: "Mr." },
        { first_name: "David", last_name: "Evans", department_id: 4, job_title: "Recruitment Specialist", title: "Mr." },
        { first_name: "Edward", last_name: "White", department_id: 5, job_title: "Analyst", title: "Mr." },
        { first_name: "Frank", last_name: "Brown", department_id: 1, job_title: "Senior Partner", title: "Mr." },
        { first_name: "George", last_name: "Parker", department_id: 2, job_title: "SEO Specialist", title: "Mr." },
        { first_name: "Harry", last_name: "Thompson", department_id: 3, job_title: "Sales Agent", title: "Mr." },
        { first_name: "Ian", last_name: "Mitchell", department_id: 4, job_title: "Administrator", title: "Mr." },
        { first_name: "Jack", last_name: "Turner", department_id: 5, job_title: "Project Lead", title: "Mr." },
        { first_name: "Kevin", last_name: "Anderson", department_id: 1, job_title: "Barrister", title: "Mr." },
        { first_name: "Luke", last_name: "Hughes", department_id: 2, job_title: "Social Media Analyst", title: "Mr." },
        { first_name: "Mark", last_name: "Roberts", department_id: 3, job_title: "Head of Sales", title: "Mr." },
        { first_name: "Neil", last_name: "Campbell", department_id: 4, job_title: "Head of HR", title: "Mr." },
        { first_name: "Oliver", last_name: "Graham", department_id: 5, job_title: "Laboratory Technician", title: "Mr." },
        { first_name: "Peter", last_name: "Hall", department_id: 1, job_title: "Contract Lawyer", title: "Mr." },
        { first_name: "Quentin", last_name: "Jackson", department_id: 2, job_title: "Project Manager", title: "Mr." },
        { first_name: "Richard", last_name: "Cooper", department_id: 3, job_title: "Accounts Manager", title: "Mr" }
      ];
      
      const women = [
        { first_name: "Alice", last_name: "Beckett", department_id: 1, job_title: "Senior Lawyer", title: "Mrs." },
        { first_name: "Beth", last_name: "Langley", department_id: 2, job_title: "Marketing Manager", title: "Mrs." },
        { first_name: "Catherine", last_name: "Hargrove", department_id: 3, job_title: "Sales Executive", title: "Miss." },
        { first_name: "Diane", last_name: "Sutherland", department_id: 4, job_title: "HR Consultant", title: "Miss." },
        { first_name: "Emma", last_name: "Moriarty", department_id: 5, job_title: "Research Analyst", title: "Miss." },
        { first_name: "Fiona", last_name: "Pennington", department_id: 1, job_title: "Junior Lawyer", title: "Miss." },
        { first_name: "Gwen", last_name: "Whitlock", department_id: 2, job_title: "Marketing Specialist", title: "Miss." },
        { first_name: "Hannah", last_name: "Donahue", department_id: 3, job_title: "Sales Manager", title: "Miss." },
        { first_name: "Isabel", last_name: "Underwood", department_id: 4, job_title: "HR Administrator", title: "Miss." },
        { first_name: "Jessica", last_name: "Wainwright", department_id: 5, job_title: "Research Scientist", title: "Miss." },
        { first_name: "Karen", last_name: "Hollingsworth", department_id: 1, job_title: "Associate Lawyer", title: "Mrs." },
        { first_name: "Lucy", last_name: "Quinlan", department_id: 2, job_title: "Marketing Coordinator", title: "Mrs." },
        { first_name: "Megan", last_name: "Stirling", department_id: 3, job_title: "Sales Representative", title: "Miss." },
        { first_name: "Natalie", last_name: "Ravenscroft", department_id: 4, job_title: "HR Specialist", title: "Miss." },
        { first_name: "Olivia", last_name: "Marlowe", department_id: 5, job_title: "Research Assistant", title: "Miss." },
        { first_name: "Patricia", last_name: "Kingsley", department_id: 1, job_title: "Legal Advisor", title: "Mrs." },
        { first_name: "Quinn", last_name: "Fotheringham", department_id: 2, job_title: "Marketing Analyst", title: "Miss." },
        { first_name: "Rachael", last_name: "Abernathy", department_id: 3, job_title: "Sales Coordinator", title: "Miss." }
      ];
      

    const employees = [...men, ...women];

    for (const employee of employees) {
  
      const employeeEntry = new Employee();
      employeeEntry.title = employee.title;
      employeeEntry.first_name = employee.first_name;
      employeeEntry.last_name = employee.last_name;
      employeeEntry.emp_no = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
      employeeEntry.job_title = employee.job_title;
      employeeEntry.department_id = employee.department_id;
      employeeEntry.telephone = `07${Math.floor(100000000 + Math.random() * 900000000)}`; 
      employeeEntry.email = `${employee.first_name}${employee.last_name}@megaco.co.uk`.toLowerCase();
      employeeEntry.profile_picture_url = `/uploads/${employee.first_name}${employee.last_name}.PNG`.toLowerCase();
      await employeeEntry.save();
      
      const user = new User();
      user.username = `${employee.first_name[0]}${employee.last_name}`.toLowerCase();
      user.password = "password";
      user.employee_id = employeeEntry.id;
      await user.save();
    }

    const guestUser = new User();
    guestUser.username = 'guest';
    guestUser.password = 'hireme';
    await guestUser.save();
  }
}