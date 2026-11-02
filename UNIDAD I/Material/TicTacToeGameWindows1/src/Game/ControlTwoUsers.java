/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import java.util.Collection;
import java.util.Iterator;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

/**
 *
 * @author cxvil
 */
public class ControlTwoUsers {

    private String mFlag;

    /**
     * @return the mBandera
     */
    public String getFlag() {
        return mFlag;
    }

    /**
     * @param mBandera the mBandera to set
     */
    public void setBandera(String flag) {
        this.mFlag = flag;
    }

    // Constructor sin parámetros.
    public ControlTwoUsers() {
        mFlag = "X";
    }

    public void InitializeData() {
        mFlag = "X";
    }
    
    public void InitializeControls(Collection<JButton> ListButtons,
            JPanel panTicTacToe) {
        /*
        for(JButton ObjectButton : ListButtons)
        {
            ObjectButton.setText("");
        }
        */
        
        InitializeButtons(ListButtons);

        panTicTacToe.setEnabled(true);
        EnableButtons(ListButtons, true);
    }

    public void MarkButton(JButton ObjectButton) {
        if (ObjectButton.getText().equals("")) {
            if (mFlag == "X") {
                ObjectButton.setText(mFlag);
                mFlag = "0";
            } else // mBandera != "X"
            {
                ObjectButton.setText(mFlag);
                mFlag = "X";
            }
        } 
        /*
        else // !(ObjectButton.getText().equals(""))
        {
            JOptionPane.showMessageDialog(null, "Casillero ocupado...");
        }
        */
    }

    private void InitializeButtons(Collection<JButton> ListButtons) {
        Iterator<JButton> it = ListButtons.iterator();

        while (it.hasNext()) {
            JButton ObjectButton = it.next();
            ObjectButton.setText("");
        }
    }

    private void EnableButtons(Collection<JButton> ListButtons,
            boolean flag) {
        Iterator<JButton> it = ListButtons.iterator();

        while (it.hasNext()) {
            JButton ObjectButton = it.next();
            ObjectButton.setEnabled(flag);
        }
    }

    private JButton GetItemListButtons(Collection<JButton> ListButtons,
            int index) {
        Iterator<JButton> it = ListButtons.iterator();
        int i = 0;

        while (it.hasNext()) {
            JButton ObjectButton = it.next();
            if (index == i) {
                return ObjectButton;
            } else {
                i++;
            }
        }
        return null;
    }

    public void CheckWinner(Collection<JButton> ListButtons,
            JPanel panTicTacToe) {
        // Se verifica si gana la X
        if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 1).getText())
                && GetItemListButtons(ListButtons, 1).getText().
                        equals(GetItemListButtons(ListButtons, 2).getText())
                && GetItemListButtons(ListButtons, 2).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 3).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 6).getText().
                equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 3).getText())
                && GetItemListButtons(ListButtons, 3).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 1).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("X")) {
            JOptionPane.showMessageDialog(null, "Ganó X");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } // Se verifica si gana la 0
        else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 1).getText())
                && GetItemListButtons(ListButtons, 1).getText().
                        equals(GetItemListButtons(ListButtons, 2).getText())
                && GetItemListButtons(ListButtons, 2).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 3).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 6).getText().
                equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 3).getText())
                && GetItemListButtons(ListButtons, 3).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 1).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 7).getText())
                && GetItemListButtons(ListButtons, 7).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 5).getText())
                && GetItemListButtons(ListButtons, 5).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 0).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 8).getText())
                && GetItemListButtons(ListButtons, 8).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } else if (GetItemListButtons(ListButtons, 2).getText().
                equals(GetItemListButtons(ListButtons, 4).getText())
                && GetItemListButtons(ListButtons, 4).getText().
                        equals(GetItemListButtons(ListButtons, 6).getText())
                && GetItemListButtons(ListButtons, 6).getText().
                        equals("0")) {
            JOptionPane.showMessageDialog(null, "Ganó 0");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        } // Se verifica si hay un empate
        else if (!GetItemListButtons(ListButtons, 0).getText().equals("")
                && !GetItemListButtons(ListButtons, 1).getText().equals("")
                && !GetItemListButtons(ListButtons, 2).getText().equals("")
                && !GetItemListButtons(ListButtons, 3).getText().equals("")
                && !GetItemListButtons(ListButtons, 4).getText().equals("")
                && !GetItemListButtons(ListButtons, 5).getText().equals("")
                && !GetItemListButtons(ListButtons, 6).getText().equals("")
                && !GetItemListButtons(ListButtons, 7).getText().equals("")
                && !GetItemListButtons(ListButtons, 8).getText().equals("")) {
            JOptionPane.showMessageDialog(null, "Empate");
            panTicTacToe.setEnabled(false);
            EnableButtons(ListButtons, false);
        }

    }

}
