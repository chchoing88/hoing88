module.exports = (app)=>{
  // root
  app.get('/',(req,res)=>{
    res.render('pages/home',{
      data : req.body.title
    });
  });

  app.get('/test',(req,res)=>{
    res.render('pages/test')
  });

  app.get('/api',(req,res)=>{
    res.json(req);
  })

};