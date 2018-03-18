// 负责生成方块
// 代表俄罗斯方块的通用逻辑，比如说左移，右移，翻转等逻辑
import Square from './Square.js';
class Square1 extends Square{
	constructor(){
	    // 旋转数组
	    super();
	    this.rotates = [
	        [
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 2, 0, 0]
	        ],
	        [
	            [0, 0, 0, 0],
	            [2, 2, 2, 2],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 2, 0, 0]
	        ],
	        [
	            [0, 0, 0, 0],
	            [2, 2, 2, 2],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

//    #
//  # # #
class Square2 extends Square{
	constructor(){
		super();
    // 旋转数组
	    this.rotates = [
	        [
	            [0, 0, 0, 0],
	            [0, 2, 0, 0],
	            [2, 2, 2, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [2, 0, 0, 0],
	            [2, 2, 0, 0],
	            [2, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [2, 2, 2, 0],
	            [0, 2, 0, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 2, 0],
	            [0, 2, 2, 0],
	            [0, 0, 2, 0],
	            [0, 0, 0, 0],
	        ]
	    ]
	}
}


//  # #
//  # #
class Square3 extends Square{
	constructor(){
		super();
	    // 旋转数组
	    this.rotates = [
	        [
	            [0, 2, 2, 0],
	            [0, 2, 2, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 2, 0],
	            [0, 2, 2, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 2, 0],
	            [0, 2, 2, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 2, 0],
	            [0, 2, 2, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

// #
// # # #
class Square4 extends Square{
	constructor(){
		super();
	    // 旋转数组
	    this.rotates = [
	        [
	            [2, 0, 0, 0],
	            [2, 2, 2, 0],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]

	        ],
	        [
	            [0, 2, 2, 0],
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 0, 0, 0]

	        ],
	        [
	            [0, 0, 0, 0],
	            [2, 2, 2, 0],
	            [0, 0, 2, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 0, 0],
	            [0, 2, 0, 0],
	            [2, 2, 0, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

//     #
class Square5 extends Square{
	constructor(){
		super();
	    // 旋转数组
	    this.rotates = [
	        [
	            [0, 0, 0, 2],
	            [0, 2, 2, 2],
	            [0, 0, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 2, 0],
	            [0, 0, 2, 0],
	            [0, 0, 2, 2],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 0, 0],
	            [0, 2, 2, 2],
	            [0, 2, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 2, 2, 0],
	            [0, 0, 2, 0],
	            [0, 0, 2, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

//   # #
// # #
class Square6 extends Square{
	constructor(){
		super();
	    // 旋转数组
	    this.rotates = [
	        [
	            [0, 0, 0, 0],
	            [0, 2, 2, 0],
	            [2, 2, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [2, 0, 0, 0],
	            [2, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 0, 0],
	            [0, 2, 2, 0],
	            [2, 2, 0, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [2, 0, 0, 0],
	            [2, 2, 0, 0],
	            [0, 2, 0, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

// # #
//   # #
class Square7 extends Square{
	constructor(){
		super();
	    // 旋转数组
	    this.rotates = [
	        [
	            [0, 0, 0, 0],
	            [0, 2, 2, 0],
	            [0, 0, 2, 2],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 0, 2],
	            [0, 0, 2, 2],
	            [0, 0, 2, 0],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 0, 0],
	            [0, 2, 2, 0],
	            [0, 0, 2, 2],
	            [0, 0, 0, 0]
	        ],
	        [
	            [0, 0, 0, 2],
	            [0, 0, 2, 2],
	            [0, 0, 2, 0],
	            [0, 0, 0, 0]
	        ]
	    ]
	}
}

var SquareFactory = function() {}
SquareFactory.prototype.make = function(index, dir) {
    var s;
    index = index + 1;
    switch (index) {
        case 1:
            s = new Square1();
            break;
        case 2:
            s = new Square2();
            break;
        case 3:
            s = new Square3();
            break;
        case 4:
            s = new Square4();
            break;
        case 5:
            s = new Square5();
            break;
        case 6:
            s = new Square6();
            break;
        case 7:
            s = new Square7();
            break;
        default:
            break;
    }
    s.origin.x = 0;
    s.origin.y = 3;
    s.rotate(dir);
    return s;
}

export default SquareFactory;