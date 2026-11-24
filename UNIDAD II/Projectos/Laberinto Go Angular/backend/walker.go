package main

type Walker struct {
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
	Table         []string
	Data          string `json:"data"`
}

func (p *Walker) CreateMatrix(r, c int) {
	p.Matrix = make([][]int, r)
	for i := range p.Matrix {
		p.Matrix[i] = make([]int, c)
	}
	p.M = r
	p.N = c
}

func (p *Walker) InitializeMatrix(a [][]int) {

	var i, j int
	for i = 0; i < p.M; i++ {
		for j = 0; j < p.N; j++ {
			p.Matrix[i][j] = a[i][j]
		}
	}

}

func (p *Walker) InitializeRoad() {

	p.Row = 0
	p.Column = 0
}

func (p *Walker) LocalizeStart() {

	var i, j int
	for i = 0; i < p.M; i++ {
		for j = 0; j < p.N; j++ {
			if p.Matrix[i][j] == 2 {
				p.Row = i
				p.Column = j
				return
			}
		}
	}

}

func (p *Walker) MoveRightSide() {

	p.X = p.X + 25
	p.Column++
}

func (p *Walker) MoveLeftSide() {

	p.X = p.X - 25
	p.Column--
}

func (p *Walker) MoveUpSide() {

	p.Y = p.Y - 25
	p.Row--
}

func (p *Walker) MoveDownSide() {

	p.Y = p.Y + 25
	p.Row++
}

func (p *Walker) InitializeGrammar() {
	p.Table = []string{"right", "left", "up", "down"}
}

func (p *Walker) ControlMovesInLaberynth(key string) {

	if p.Matrix[p.Row][p.Column] != 3 {
		if key == "ArrowRight" {
			if p.Matrix[p.Row][p.Column+1] != 0 {
				p.MoveRightSide()
			}
		}
		if key == "ArrowLeft" {
			if p.Matrix[p.Row][p.Column-1] != 0 {
				p.MoveLeftSide()
			}
		}
		if key == "ArrowUp" {
			if p.Matrix[p.Row-1][p.Column] != 0 {
				p.MoveUpSide()
			}
		}
		if key == "ArrowDown" {
			if p.Matrix[p.Row+1][p.Column] != 0 {
				p.MoveDownSide()
			}
		}
		if p.Matrix[p.Row][p.Column] == 3 {
			p.Message = "Felicitaciones, buen trabajo."
		}
	}

}

func (p *Walker) ControlSpeechMoves(text string) {

	if text == "right" {
		if p.Matrix[p.Row][p.Column+1] != 0 {
			p.MoveRightSide()
		}
	} else if text == "left" {
		if p.Matrix[p.Row][p.Column-1] != 0 {
			p.MoveLeftSide()
		}
	} else if text == "up" {
		if p.Matrix[p.Row-1][p.Column] != 0 {
			p.MoveUpSide()
		}
	} else if text == "down" {
		if p.Matrix[p.Row+1][p.Column] != 0 {
			p.MoveDownSide()
		}
	} else {
		p.Data = p.Data + " " + text
	}

}
