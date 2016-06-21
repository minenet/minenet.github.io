---
title: 《集体智慧编程》学习笔记（1）
date: 2016-06-21 14:36:20
categories: Machine Learning
tags:
---
最近一直在学习集体智慧编程，第二章开始就学习推荐。用了简单的例子对常见的推荐做了简单的实践应用。上一篇博客中写到了几种常见推荐算法的优劣。现在主要记录几种相似度计算以及部分课后习题的练习。
### 欧几里德距离
计算多维空间的两点的距离，通过距离的远近来表示相似度。  
$ (p_1,p_2,p_3,\cdots) $和$ (q_1,q_2,q_3,\cdots) $两个点的欧几里得距离为：
  
$$ \sqrt{\sum_{i=1}^{n}(p_i-q_i)^2}= \sqrt{(p_1-q_1)^{2} + (p_2-q_2)^2 + \cdots +(p_n-q_n)^2} \tag{1}$$

上面式子中就是求两个点的欧几里德距离。Python代码实现：
```py
def euclidean(p,q):
    sum = 0.0
for i in range(len(P)):
    sum += (p[i] - q[i])**2
return sum**0.5
```
### 皮尔逊相关系数
两个变量之间的相关程度，通过这个相关程度表示相似度。  
$$ r = \frac{\sum{XY}-\frac{\sum{X}\sum{Y}}{N}} {\sqrt{(\sum{X}^2-\frac{(\sum{X})^2}{N})(\sum{Y}^2-\frac{(\sum{Y})^2}{N})}}  \tag{2}$$

皮尔逊相关系数python实现：
```py
def pearson(x, y):
    n = len(x)

    sum_x = sum(float(i) for i in x)
    sum_y = sum(float(i) for i in y)
    
    sum_x2 = sum(i**2.0 for i in x)
    sum_y2 = sum(i**2.0 for i in y)
    
    sum_xy = sum(x[i]*y[i] for i in range(n))
    
    den = ((sum_x2 - (sum_x**2.0)/n) * (sum_y2 - (sum_y**2.0)/n ))**0.5
    if den == 0:
    	return 1
    else:
    	return (sum_xy-(sum_x * sum_y)/n) / den

```
注：1表示变量完全相关，0表示无关，-1表示完全负相关。

如何选择相似度的计算，就需要根据场合选择合适的系数来计算。比如item特别少时，欧几里德距离就出现偏差过大。 

### 练习 
 
主要解答第五题。
首先去官网[LAST.FM](http://www.last.fm)申请API的账户。你将会获得API_KEY等相关秘钥。、
与Python想关的API也可以在官网获得。代码托管在github上[pylast](https://github.com/pylast/pylast)。

可能由于网站的改版等原因，有些函数返回的结果为空，有点蛋疼。所做的推荐也比较简单，大致思路：
1. 根据你想要推荐的tag，首先找出网站所有的排行榜靠前的标签（tags）。
2. 根据这些热门标签找出被打出行管tag的音乐专辑。
3. 对于计算Tanimoto相似度，得出与想要推荐tag相关的tag（根据tag找专辑，找歌曲）。

贴代码： 
```py
import pylast
'''
This a test for last.fm API, you can get functions by help(pylast).
author: minenet
'''
# you must get a account from http://www.last.fm/api, API_KEY and API_SECRET
API_KEY = 'your API_KEY' 
API_SECRET = 'your API_SECRET'

username = 'your username'
password_hash = pylast.md5('your password')

network = pylast.LastFMNetwork(
    api_key = API_KEY, 
    api_secret = API_SECRET, 
    username = username,
    password_hash = password_hash
)

def albumsList(tag=''):
	albums_list = {}
	tags = network.get_top_tags()
	tagList = []
	for tg in tags:
		tg = str(tg)
		tag_start = tg.index('Tag') + 6
		tag_end = tg.index(',') - 1
		tagList.append(tg[tag_start:tag_end])
	if tag not in tagList:
		tagList.append(tag)
	for tagItem in tagList:	
		tag = network.get_tag(tagItem)
		albums_list[tagItem] = {}
		for album in tag.get_top_albums():
			album = str(album)
			album_start = album.index('Album') + 8
			album_end = album.index(',') - 1
			album = album[album_start:album_end]
			albums_list[tagItem][album] = 1.0		
	return albums_list

def recommendations(tag='', n=5):
	albums_list = albumsList(tag)
	recommendation = []
	for item in albums_list:
		if item != tag:
			scores = sim_tanimoto(albums_list, tag, item)
			recommendation.append((scores, item))
	recommendation.sort()
	recommendation.reverse()
	return recommendation[0:n]

def sim_tanimoto(prefs,tag,item):
	cossElement = [sim for sim in prefs[item] if sim in prefs[tag]]
	return float(len(cossElement)) / (len(prefs[item])+ len(prefs[tag]) - len(cossElement))

print recommendations('rock')
'''
print example:
[(0.07407407407407407, 'hard rock'),
 (0.06976744186046512, 'classic rock'), 
 (0.06557377049180328, 'alternative rock'), 
 (0.05660377358490566, 'pop'), 
 (0.05084745762711865, 'british')]

'''
if you want get more help, you can use commmand help(pylast) in python command line. 
```  
相似度计算也可以选择其他的，代码中使用了Tanimoto。
$$ T = \frac{N_c}{N_a + N_b - N_c} \tag{3}$$

其中对于集合A和B，$ N_a,N_b $分别是A,B元素的个数，$ N_c = A \cap B $ 




 
