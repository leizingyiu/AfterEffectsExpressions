function otherLayerThisProp(l){
	//*by leizingyiu*//
	if(typeof l == "string"){try{
		l=thisComp.layer(l);
		}catch(err){
			throw '找不到图层 '+l;
		}
	}else if(l.className!='Layer'){
		throw '输入的 '+l+' 不是图层';
	}

	let p=thisProperty;
	let arr=[];
	while(p.className!='Layer'){
		arr.unshift(p.name);
		p=p.propertyGroup(1);
		}	
	let e='';
	arr.map(a=>{
		try{
			l=l(a);	
		}catch(err){
			e=e==''?'在图层 '+l+' 中 \n':e;
			e+='\t找不到属性 '+a+' ；\n';}
	});
	if(e!=''){
		throw err+'\n'+e;
		}
	return l;
	};

hasParent?otherLayerThisProp('ctrler'):value;

hasParent?otherLayerThisProp(parent):value;

hasParent?otherLayerThisProp(thisComp.layer(1)):value;
