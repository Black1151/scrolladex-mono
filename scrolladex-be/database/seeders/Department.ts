import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Department from 'App/Models/Department'

export default class DepartmentSeeder extends BaseSeeder {
  public async run () {
    const departments = [
      {
        department_name: "Legal",
        address_line_one: "123 Legal Lane",
        address_line_two: "Building 1",
        town: "London",
        county: "Greater London",
        postcode: "WC2N 5DU"
      },
      {
        department_name: "Marketing",
        address_line_one: "456 Marketing Mews",
        address_line_two: "Suite 200",
        town: "Manchester",
        county: "Greater Manchester",
        postcode: "M2 5PD"
      },
      {
        department_name: "Sales",
        address_line_one: "789 Sales Street",
        address_line_two: "Unit 3A",
        town: "Bristol",
        county: "City of Bristol",
        postcode: "BS1 5TT"
      },
      {
        department_name: "Human Resources",
        address_line_one: "321 HR Road",
        address_line_two: "Floor 4",
        town: "Birmingham",
        county: "West Midlands",
        postcode: "B1 1AA"
      },
      {
        department_name: "R & D",
        address_line_one: "654 R&D Avenue",
        address_line_two: "Office 5B",
        town: "Leeds",
        county: "West Yorkshire",
        postcode: "LS1 5QS"
      }
    ];
    await Department.createMany(departments)
  }
}
