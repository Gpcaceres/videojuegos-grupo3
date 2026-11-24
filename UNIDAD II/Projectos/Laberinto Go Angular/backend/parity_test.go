package main

import (
	"encoding/json"
	"os"
	"testing"
)

type fixture struct {
	Method           string
	Matrix           [][]int
	InitialDirection string
	Row              int
	Column           int
	Direction        string
	X                int
	Y                int
	DirectionText    string
	Finished         bool
}

func TestOriginalDecisions(t *testing.T) {
	data, err := os.ReadFile("testdata/original_decisions.json")
	if err != nil {
		t.Fatal(err)
	}
	var cases []fixture
	if err = json.Unmarshal(data, &cases); err != nil {
		t.Fatal(err)
	}
	for i, c := range cases {
		p := NonPlayerCharacter{Matrix: c.Matrix, Row: 4, Column: 4, X: 100, Y: 100, Direction: c.InitialDirection}
		finished := false
		switch c.Method {
		case "RapidMovementWithLeftHandAI":
			p.RapidMovementWithLeftHandAI()
		case "RapidMovementWithRightHandAI":
			p.RapidMovementWithRightHandAI()
		case "PausedMovementWithAI":
			p.PausedMovementWithAI()
		case "DetermineStartDirection":
			p.DetermineStartDirection()
		case "DetermineFinishDirection":
			finished = p.DetermineFinishDirection()
		}
		if p.Row != c.Row || p.Column != c.Column || p.Direction != c.Direction || p.X != c.X || p.Y != c.Y || p.DirectionText != c.DirectionText || finished != c.Finished {
			t.Fatalf("caso %d %s: resultado diferente al C# original: %+v / %+v", i, c.Method, p, c)
		}
	}
}
func TestOriginalRoutes(t *testing.T) {
	data, err := os.ReadFile("testdata/original_routes.json")
	if err != nil {
		t.Fatal(err)
	}
	var traces map[string][][4]int
	if err = json.Unmarshal(data, &traces); err != nil {
		t.Fatal(err)
	}
	for hand, trace := range traces {
		p := NonPlayerCharacter{Direction: Up}
		p.CreateMatrix(19, 19)
		p.InitializeMatrix(matrix)
		p.InitializeRoad()
		p.LocalizeStart()
		p.X = 50
		p.Y = 25
		p.DetermineStartDirection()
		for i, want := range trace {
			if hand == "left" {
				p.RapidMovementWithLeftHandAI()
			} else {
				p.RapidMovementWithRightHandAI()
			}
			done := false
			if i > 0 {
				done = p.DetermineFinishDirection()
			}
			got := [4]int{p.Row, p.Column, p.X, p.Y}
			if got != want {
				t.Fatalf("%s tick %d: %v esperado %v", hand, i, got, want)
			}
			if done != (i == len(trace)-1) {
				t.Fatalf("%s tick %d: meta diferente", hand, i)
			}
		}
		t.Logf("%s: %d ticks, meta (%d,%d)", hand, len(trace)-1, p.Row, p.Column)
	}
}
func TestWalkerControls(t *testing.T) {
	p := Walker{}
	p.CreateMatrix(19, 19)
	p.InitializeMatrix(matrix)
	p.InitializeRoad()
	p.LocalizeStart()
	p.X = 50
	p.Y = 25
	p.InitializeGrammar()
	p.ControlMovesInLaberynth("ArrowRight")
	if p.Row != 1 || p.Column != 2 {
		t.Fatal("atraviesa pared")
	}
	p.ControlMovesInLaberynth("ArrowDown")
	if p.Row != 2 || p.Column != 2 || p.Y != 50 {
		t.Fatal("movimiento teclado")
	}
	p.ControlSpeechMoves("right")
	if p.Column != 3 || p.X != 75 {
		t.Fatal("movimiento voz")
	}
	p.ControlSpeechMoves("hello")
	if p.Data != " hello" {
		t.Fatal("texto de voz")
	}
	p.Row = 16
	p.Column = 16
	p.X = 400
	p.Y = 400
	p.ControlMovesInLaberynth("ArrowDown")
	if p.Row != 17 || p.Message == "" {
		t.Fatal("meta teclado")
	}
	p.ControlMovesInLaberynth("ArrowUp")
	if p.Row != 17 {
		t.Fatal("teclado no se bloquea en meta")
	}
	p.ControlSpeechMoves("up")
	if p.Row != 16 {
		t.Fatal("voz debe conservar comportamiento original en meta")
	}
}
