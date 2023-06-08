import Env from '@ioc:Adonis/Core/Env'
import { driveConfig } from '@adonisjs/core/build/config'
import Application from '@ioc:Adonis/Core/Application'

export default driveConfig({
  disk: Env.get('DRIVE_DISK'),

  disks: {
    local: {
      driver: 'local',
      visibility: 'public',
      root: Application.tmpPath('uploads'),
      serveFiles: true,
      basePath: '/uploads',
    },

    // s3: {
    //   driver: 's3',
    //   visibility: 'public',
    //   bucket: Env.get('S3_BUCKET'),
    //   region: Env.get('S3_REGION'),
    //   credentials: {
    //     accessKeyId: Env.get('S3_ACCESS_KEY'),
    //     secretAccessKey: Env.get('S3_SECRET_ACCESS_KEY'),
    //   },
    // },
  },
});
