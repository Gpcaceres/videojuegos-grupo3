package main

import "time"

const (
	Up    = "Up"
	Down  = "Down"
	Left  = "Left"
	Right = "Right"
)

type NonPlayerCharacter struct {
	Matrix        [][]int `json:"matrix"`
	Row           int     `json:"row"`
	Column        int     `json:"column"`
	M             int     `json:"m"`
	N             int     `json:"n"`
	X             int     `json:"x"`
	Y             int     `json:"y"`
	Direction     string  `json:"direction"`
	DirectionText string  `json:"directionText"`
	Message       string  `json:"message"`
	Miliseconds   int
}

func (p *NonPlayerCharacter) CreateMatrix(r, c int) {
	p.Matrix = make([][]int, r)
	for i := range p.Matrix {
		p.Matrix[i] = make([]int, c)
	}
	p.M = r
	p.N = c
}

func (p *NonPlayerCharacter) InitializeMatrix(a [][]int) {

	var i, j int
	for i = 0; i < p.M; i++ {
		for j = 0; j < p.N; j++ {
			p.Matrix[i][j] = a[i][j]
		}
	}

}

func (p *NonPlayerCharacter) InitializeRoad() {

	p.Row = 0
	p.Column = 0
}

func (p *NonPlayerCharacter) LocalizeStart() {

	var i, j int
	for i = 0; i < p.M; i++ {
		for j = 0; j < p.N; j++ {
			if p.Matrix[i][j] == 2 {
				p.Row = i
				p.Column = j
			}
		}
	}

}

func (p *NonPlayerCharacter) MoveRightSide() {

	p.X = p.X + 25
	p.Column++
}

func (p *NonPlayerCharacter) MoveLeftSide() {

	p.X = p.X - 25
	p.Column--
}

func (p *NonPlayerCharacter) MoveUpSide() {

	p.Y = p.Y - 25
	p.Row--
}

func (p *NonPlayerCharacter) MoveDownSide() {

	p.Y = p.Y + 25
	p.Row++
}

func (p *NonPlayerCharacter) DetermineStartDirection() {

	if p.Matrix[p.Row][p.Column+1] != 0 {
		p.Direction = Right
	}
	if p.Matrix[p.Row][p.Column-1] != 0 {
		p.Direction = Left
	}
	if p.Matrix[p.Row-1][p.Column] != 0 {
		p.Direction = Up
	}
	if p.Matrix[p.Row+1][p.Column] != 0 {
		p.Direction = Down
	}

}

func (p *NonPlayerCharacter) InitializeRapidMovement() {

	p.DetermineStartDirection()
	switch p.Direction {
	case Down:
		p.MoveDownSide()
		break
	case Up:
		p.MoveUpSide()
		break
	case Right:
		p.MoveRightSide()
		break
	case Left:
		p.MoveLeftSide()
		break
	}

}

func (p *NonPlayerCharacter) InitializePausedMovement() {

	p.DetermineStartDirection()
	switch p.Direction {
	case Down:
		p.MoveDownSide()
		time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		p.DirectionText = p.Direction
		break
	case Up:
		p.MoveUpSide()
		time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		p.DirectionText = p.Direction
		break
	case Right:
		p.MoveRightSide()
		time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		p.DirectionText = p.Direction
		break
	case Left:
		p.MoveLeftSide()
		time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		p.DirectionText = p.Direction
		break
	}

}

func (p *NonPlayerCharacter) DetermineFinishDirection() bool {

	if p.Matrix[p.Row][p.Column+1] == 3 {
		p.Direction = Right
		p.MoveRightSide()
		return true
	} else if p.Matrix[p.Row][p.Column-1] == 3 {
		p.Direction = Left
		p.MoveLeftSide()
		return true
	} else if p.Matrix[p.Row-1][p.Column] == 3 {
		p.Direction = Up
		p.MoveUpSide()
		return true
	} else if p.Matrix[p.Row+1][p.Column] == 3 {
		p.Direction = Down
		p.MoveDownSide()
		return true
	} else {
		return false
	}

}

func (p *NonPlayerCharacter) ObserveRightSide() bool {

	if p.Matrix[p.Row][p.Column+1] != 0 {
		return true
	} else {
		return false
	}

}

func (p *NonPlayerCharacter) ObserveLeftSide() bool {

	if p.Matrix[p.Row][p.Column-1] != 0 {
		return true
	} else {
		return false
	}

}

func (p *NonPlayerCharacter) ObserveUpSide() bool {

	if p.Matrix[p.Row-1][p.Column] != 0 {
		return true
	} else {
		return false
	}

}

func (p *NonPlayerCharacter) ObserveDownSide() bool {

	if p.Matrix[p.Row+1][p.Column] != 0 {
		return true
	} else {
		return false
	}

}

func (p *NonPlayerCharacter) RapidMovementWithLeftHandAI() {

	if p.Direction == Right {
		if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == true && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == true && p.ObserveRightSide() == false {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveRightSide() == false {
			p.Direction = Left
			p.MoveLeftSide()
		}
	} else if p.Direction == Left {
		if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveUpSide() == true && p.ObserveDownSide() == false && p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveUpSide() == true && p.ObserveDownSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Right
			p.MoveRightSide()
		}
	} else if p.Direction == Up {
		if p.ObserveLeftSide() == false && p.ObserveRightSide() == false && p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveLeftSide() == false && p.ObserveRightSide() == true && p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveLeftSide() == false && p.ObserveUpSide() == false && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveUpSide() == false && p.ObserveRightSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Down
			p.MoveDownSide()
		}
	} else if p.Direction == Down {
		if p.ObserveLeftSide() == false && p.ObserveRightSide() == false && p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveLeftSide() == true && p.ObserveRightSide() == false && p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveLeftSide() == true && p.ObserveDownSide() == false && p.ObserveRightSide() == false {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveDownSide() == false && p.ObserveRightSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Up
			p.MoveUpSide()
		}
	}

}

func (p *NonPlayerCharacter) RapidMovementWithRightHandAI() {

	if p.Direction == Right {
		if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveUpSide() == true && p.ObserveDownSide() == false && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveUpSide() == true && p.ObserveDownSide() == false && p.ObserveRightSide() == false {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveRightSide() == false {
			p.Direction = Left
			p.MoveLeftSide()
		}
	}

	if p.Direction == Left {
		if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == true && p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == true && p.ObserveLeftSide() == false {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveUpSide() == false && p.ObserveDownSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Right
			p.MoveRightSide()
		}
	}

	if p.Direction == Up {
		if p.ObserveLeftSide() == false && p.ObserveRightSide() == false && p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveLeftSide() == true && p.ObserveRightSide() == false && p.ObserveUpSide() == true {
			p.Direction = Up
			p.MoveUpSide()
		} else if p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveLeftSide() == true && p.ObserveUpSide() == false && p.ObserveRightSide() == false {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveUpSide() == false && p.ObserveRightSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Down
			p.MoveDownSide()
		}
	}

	if p.Direction == Down {
		if p.ObserveLeftSide() == false && p.ObserveRightSide() == false && p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveLeftSide() == false && p.ObserveRightSide() == true && p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
		} else if p.ObserveLeftSide() == true {
			p.Direction = Left
			p.MoveLeftSide()
		} else if p.ObserveLeftSide() == false && p.ObserveDownSide() == false && p.ObserveRightSide() == true {
			p.Direction = Right
			p.MoveRightSide()
		} else if p.ObserveDownSide() == false && p.ObserveRightSide() == false && p.ObserveLeftSide() == false {
			p.Direction = Up
			p.MoveUpSide()
		}
	}

}

func (p *NonPlayerCharacter) PausedMovementWithAI() {

	if p.Direction == Right {
		if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == false &&
			p.ObserveRightSide() == true {
			p.Direction = Right
			p.DirectionText = p.Direction
			p.MoveRightSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == true &&
			p.ObserveDownSide() == false &&
			p.ObserveRightSide() == true {
			p.Direction = Right
			p.DirectionText = p.Direction
			p.MoveRightSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveDownSide() == true {
			p.Direction = Down
			p.DirectionText = p.Direction
			p.MoveDownSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == true &&
			p.ObserveDownSide() == false &&
			p.ObserveRightSide() == false {
			p.Direction = Up
			p.DirectionText = p.Direction
			p.MoveUpSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == false &&
			p.ObserveRightSide() == false {
			p.Direction = Left
			p.DirectionText = p.Direction
			p.MoveLeftSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		}
	}

	if p.Direction == Left {
		if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == false &&
			p.ObserveLeftSide() == true {
			p.Direction = Left
			p.DirectionText = p.Direction
			p.MoveLeftSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == true &&
			p.ObserveLeftSide() == true {
			p.Direction = Left
			p.DirectionText = p.Direction
			p.MoveLeftSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == true {
			p.Direction = Up
			p.DirectionText = p.Direction
			p.MoveUpSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == true &&
			p.ObserveLeftSide() == false {
			p.Direction = Down
			p.DirectionText = p.Direction
			p.MoveDownSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == false &&
			p.ObserveDownSide() == false &&
			p.ObserveLeftSide() == false {
			p.Direction = Right
			p.DirectionText = p.Direction
			p.MoveRightSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		}
	}

	if p.Direction == Up {
		if p.ObserveLeftSide() == false &&
			p.ObserveRightSide() == false &&
			p.ObserveUpSide() == true {
			p.Direction = Up
			p.DirectionText = p.Direction
			p.MoveUpSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveLeftSide() == true &&
			p.ObserveRightSide() == false &&
			p.ObserveUpSide() == true {
			p.Direction = Up
			p.DirectionText = p.Direction
			p.MoveUpSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveRightSide() == true {
			p.Direction = Right
			p.DirectionText = p.Direction
			p.MoveRightSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveLeftSide() == true &&
			p.ObserveUpSide() == false &&
			p.ObserveRightSide() == false {
			p.Direction = Left
			p.DirectionText = p.Direction
			p.MoveLeftSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveUpSide() == false &&
			p.ObserveRightSide() == false &&
			p.ObserveLeftSide() == false {
			p.Direction = Down
			p.DirectionText = p.Direction
			p.MoveDownSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		}
	}

	if p.Direction == Down {
		if p.ObserveLeftSide() == false &&
			p.ObserveRightSide() == false &&
			p.ObserveDownSide() == true {
			p.Direction = Down
			p.MoveDownSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveLeftSide() == false &&
			p.ObserveRightSide() == true &&
			p.ObserveDownSide() == true {
			p.Direction = Down
			p.DirectionText = p.Direction
			p.MoveDownSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveLeftSide() == true {
			p.Direction = Left
			p.DirectionText = p.Direction
			p.MoveLeftSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveLeftSide() == false &&
			p.ObserveDownSide() == false &&
			p.ObserveRightSide() == true {
			p.Direction = Right
			p.DirectionText = p.Direction
			p.MoveRightSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		} else if p.ObserveDownSide() == false &&
			p.ObserveRightSide() == false &&
			p.ObserveLeftSide() == false {
			p.Direction = Up
			p.DirectionText = p.Direction
			p.MoveUpSide()
			time.Sleep(time.Duration(p.Miliseconds) * time.Millisecond)
		}
	}

}
