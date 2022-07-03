import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
  private adminRole: Role
  private staffRole: Role
  private teacherRole: Role
  private studentRole: Role

  public async run() {
    this.seedRoles()
  }
  private async seedRoles() {
    this.adminRole = await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'Admin role',
    })
    this.teacherRole = await Role.create({
      name: 'Teacher',
      slug: 'teacher',
      description: 'Teacher role',
    })
    this.studentRole = await Role.create({
      name: 'Student',
      slug: 'student',
      description: 'Student role',
    })
    this.staffRole = await Role.create({
      name: 'Staff',
      slug: 'staff',
      description: 'Staff role',
    })
  }
}
