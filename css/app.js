new Vue ({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = []

    },
    attack() {
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage}`
      })
      // returning true - always the case if you lost or won.
      // if returned true it means we don't want to continue the game anymore.
      // if returned false, it means continue the game.
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack()

    },
    specialAttack() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage}`
      })
      if (this.checkWin()) {
        return;
      }
      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth <= 90){
      this.playerHealth += 10
    } else {
        this.playerHealth = 100;
    }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for 10`
    })
      this.monsterAttack()
    },

    giveUp() {
      this.gameIsRunning = false;
      this.startGame()
    },

    monsterAttack() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage
            // don't need to return since there is no code after this function.
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits player for ${damage}`
      })
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max ) + 1, min)
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game?')){
          this.startGame();
        } else {
            this.gameIsRunning = false;
          }
          return true;

        } else if (this.playerHealth <= 0 ) {
            if (confirm('You Lost! New game?')) {
              this.startGame()
          } else {
              this.gameIsRunning = false;
          }
          return true;
        }
        return false;
      }
    }
  })
