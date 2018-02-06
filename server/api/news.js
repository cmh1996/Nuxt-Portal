import { Router } from 'express';
import { serverAxios as axios } from '../../plugins/axios';

const router = Router();

//新闻
router.get('/news',(req,res,next)=>{
	const typeId = req.query.typeId;
	return axios.get(`http://36kr.com/api/post?column_id=${typeId}&b_id=&per_page=20`)
	.then((response)=>{
		res.json(response.data)
	})
	.catch((err)=>{
		res.json(err)
	})
})

//新闻人物言论
router.get('/news/character',(req,res,next)=>{
	return axios.get(`http://36kr.com/api/biggie-word`)
	.then((response)=>{
		res.json(response.data)
	})
	.catch((err)=>{
		res.json(err)
	})
})

//新闻详情
router.get('/news/detail',(req,res,next)=>{
	const newsId = req.query.newsId;
	return axios.get(`http://36kr.com/api/post/${newsId}`)
	.then((response)=>{
		res.json(response.data)
	})
	.catch((err)=>{
		res.json(err)
	})
})

//作者资料
router.get('/news/author',(req,res,next)=>{
	const authorId = req.query.authorId;
	return axios.get(`http://36kr.com/api/user/${authorId}/rong`)
	.then((response)=>{
		res.json(response.data)
	})
	.catch((err)=>{
		res.json(err)
	})
})

export default router;