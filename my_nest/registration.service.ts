class RegistrationSvc {
    private singleton = new Map();
    private tokenMap = new Map();

    public createInstance(member: any, token?: any) {
        if (this.singleton.has(member)) {
            console.log(`Instance with ${member.name} is already created`)
        } else {
            console.log(`Instance with ${member.name} was created now`)
            this.singleton.set(member, new member());
        }

        if (token) {
            this.tokenMap.set(token, member);
        }
    }

    public getInstance(member: any) {
        if (!this.singleton.has(member)) {
            this.createInstance(member)
        } else {
            console.log(`Instance ${member.name} was already created!`)
        }
        return this.singleton.get(member);
    }

    public getInstanceByToken(token: any) {
        if(this.tokenMap.has(token)) {
            const member  = this.tokenMap.get(token);
            if (!this.singleton.has(member)) {
            this.createInstance(member)
        }
            console.log(`Instance ${member.name} was already created!`)
            return this.singleton.get(member);
        }
        throw new Error (`There is no token ${token}`)
    }
}

export const registrationSvc = new RegistrationSvc();
