import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DatabaseSeeder } from './database-seeder';
import {SeederModule} from "./seeder.module";

async function seed() {
    const app = await NestFactory.createApplicationContext(SeederModule);
    const seeder = app.get(DatabaseSeeder);

    console.log('Starting database seeding...');
    await seeder.run();
    console.log('Seeding complete!');

    await app.close();
}

seed().catch(err => {
    console.error('Seeding failed:', err);
});
