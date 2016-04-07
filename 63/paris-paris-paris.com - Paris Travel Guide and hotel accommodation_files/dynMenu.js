var nbMaxMenu = 15;
var hoverOffDelay = 500;
var delayHide;
function getId(id){return document.getElementById(id);}

function hideSubMenus()
{
    for(var i = 1; i<=nbMaxMenu; i++){
        daElement = getId('subMenu'+i);
        if(daElement) 
        {
            if ( daElement.style.display == 'block' )
            {
                daElement.style.display = 'none';
                parentItem = getId('parentItem'+i);
                
                if(parentItem) 
                {
                    parentClassName = parentItem.className;
                    if ( parentClassName.indexOf('over') )
                    {
                        parentItem.className = parentClassName.substr(0,parentClassName.length-5); // size of "-over" the className
                    }
                }  
            }
        }
    }
}

function hm()
{
    setTimeout( 'hideSubMenus()', hoverOffDelay );
}

function showSubMenu(subMenu)
{
    daElement = getId('subMenu'+subMenu);
    if(daElement) daElement.style.display = 'block';
    
    parentItem = getId('parentItem'+subMenu);
    if(parentItem)
    {
        var currentClass = parentItem.className;
        parentItem.className = currentClass+'-over';
    }
}

function switchOver(obj)
{
    var currentClass = obj.className;
    obj.className = currentClass+'-over';
}

function switchOut(obj)
{
    var currentClass = obj.className;
    obj.className = currentClass.substr(0,currentClass.length-5);
}

function goto(url)
{
    document.location.href=url;
}