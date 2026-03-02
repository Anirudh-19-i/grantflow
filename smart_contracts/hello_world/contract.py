import algopy
from algopy import arc4, itxn, Txn

class GrantTracker(arc4.ARC4Contract):
    # These are our global state variables (stored on the blockchain)
    sponsor: algopy.Account
    student_team: algopy.Account
    milestone_approved: bool
    grant_amount: algopy.UInt64

    # 1. Initialize the Grant
    @arc4.abimethod(allow_actions=["NoOp"], create="require")
    def create_application(self, student_team: algopy.Account, grant_amount: algopy.UInt64) -> None:
        self.sponsor = Txn.sender # The person deploying the contract is the sponsor
        self.student_team = student_team
        self.grant_amount = grant_amount
        self.milestone_approved = False

    # 2. Sponsor Approves the Milestone
    @arc4.abimethod
    def approve_milestone(self) -> None:
        # Security check: Only the sponsor can approve!
        assert Txn.sender == self.sponsor, "Only the sponsor can approve milestones."
        self.milestone_approved = True

    # 3. Student Team Claims the Funds
    @arc4.abimethod
    def claim_funds(self) -> None:
        # Security checks
        assert Txn.sender == self.student_team, "Only the student team can claim funds."
        assert self.milestone_approved, "The milestone has not been approved yet."
        
        # Release the Algos to the student team via an Inner Transaction
        itxn.Payment(
            receiver=self.student_team,
            amount=self.grant_amount,
            fee=0 # The caller (student) covers the tiny transaction fee
        ).submit()
