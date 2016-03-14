var navItems = [
  new NavItem('first half', '#audio/mb1.m4a'),
  new NavItem('second half', '#audio/mb2.m4a')
];


function NavItem(desc, href){
  this.desc = desc;
  this.href = href;
  this.$ = $('<li><a href="'+href+'">'+desc+'</a></li>');
  this.get$ = function(){
    return this.$; 
  }
}

$nav = $('nav ul');
navItems.forEach(function(navItem){
  $nav.append(navItem.get$());
});
