# MyNest

1) Most of decorators were tested in students.controller.ts and students.service.ts

2) Errors which are thrown were processed in routes.ts file and res.send() to the users with status(400, 404,....) and error { message }

3) Next decorators were implemented:
 - @Module 
 - @Injectable 
 - @Injectable(token) - It is was tested in teachers.controller.ts and teachers service.ts 
 - @Get() Get(:params)
 - @Post() Post(params) 
 - @Put() @Put(params)
 - @Delete() @Delete(params)
 - @Body() @Body(params)
 - @Query() @Query(params)

 4) Start server: npm start
